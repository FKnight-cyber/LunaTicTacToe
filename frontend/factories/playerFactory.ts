import { faker } from '@faker-js/faker';

export default async function __playerFactory(){
    return {
        username: faker.name.firstName(),
        password: faker.lorem.words(2),
    }
}