const { faker } = require('@faker-js/faker');

function createRandomUser() {
  return {
    name: faker.person.fullName(),
  };
}

const getSudents = (num) => faker.helpers.multiple(createRandomUser, {
  count: num,
});

module.exports = getSudents;
