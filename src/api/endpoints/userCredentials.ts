import { client } from '../client'

export const getUserCredentials = async (userId: number) => {
    const { response, data, error } = await client.GET('/api/UserCredentials/{id}', {
        params: {
            path: {
                id: userId
            }
        }
    });

    if (!data || (!response.ok && error))
        throw error;

    return data;
}

// function userFromGetUserCredentials(dto: components['schemas']['']) {
//     return {
//         id: dto.id,
//         email: dto.email,
//         password: dto.password
//     }
// }