import { useSQLiteContext } from "expo-sqlite"

export type CustomerDataBase = {
    cnpj: string,
    business_name: string,
    address: {
        street: string;
        number: string;
        city: string;
        neighborhood: string;
        state: string;
        zipCode: string;
    };
    photo: string;
};

export function useCustomerDataBase() {
    const database = useSQLiteContext()

    async function create(data: CustomerDataBase) {
        const existingCustomer = await getByCnpj(data.cnpj);
        if (existingCustomer) {
            throw new Error("Este CNPJ já está cadastrado.");
        }

        const statement = await database.prepareAsync(
            `INSERT INTO customers (cnpj, business_name, address, photo)
                VALUES ($cnpj, $business_name, $address, $photo)
            `
        )

        const photoBase64 = await convertImageToBase64(data.photo);

        try {
            const result = await statement.executeAsync({
                $cnpj: data.cnpj,
                $business_name: data.business_name,
                $address: JSON.stringify(data.address),
                $photo: photoBase64,
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            return { insertedRowId }
        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function getByCnpj(cnpj: string) {
        try {
            const query = "SELECT * FROM customers WHERE cnpj = $cnpj";
            const response = await database.getFirstAsync<CustomerDataBase>(query, { $cnpj: cnpj });
            return response;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async function getAll(limit = 10, offset = 0) {
        try {
            const query = "SELECT * FROM customers LIMIT $limit OFFSET $offset";
            const response = await database.getAllAsync<CustomerDataBase>(query, { $limit: limit, $offset: offset });
            return response;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    return { create, getAll }
}

async function convertImageToBase64(photoUrl: string): Promise<string | null> {
    if (!photoUrl) return null;
  
    try {
      const response = await fetch(photoUrl);
      const photoBlob = await response.blob();
  
      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = (reader.result as string)?.split(',')[1];
          resolve(base64 || null);
        };
        reader.onerror = () => reject("Erro ao ler a imagem como Base64");
        reader.readAsDataURL(photoBlob);
      });
    } catch (error) {
      console.error("Failed to convert image to Base64:", error);
      return null;
    }
  }
  