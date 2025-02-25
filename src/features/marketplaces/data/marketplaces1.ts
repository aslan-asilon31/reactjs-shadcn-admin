import { faker } from '@faker-js/faker'

export const marketplaces = Array.from({ length: 20 }, () => {
  const name = faker.person.firstName()
  return {
    id: faker.string.uuid(),
    name,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }
})
