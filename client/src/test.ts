import { z } from 'zod';

export const GroupSchema = z.object({
  id: z.number(),
  name: z.string(),
  img: z.string(),
});

export const GroupSchemaArray = z.array(GroupSchema);

const testObject = {
  id: 1,
  name: 'name',
  img: 'img',
};

const testObjectArray = [
  testObject,
  {
    id: 2,
    name: 'name2',
    img: 'img2',
  },
  {
    id: 3,
    name: 'name3',
    img: 'img3',
  },
];

const parsed = GroupSchemaArray.parse(testObjectArray);
console.log(parsed);
