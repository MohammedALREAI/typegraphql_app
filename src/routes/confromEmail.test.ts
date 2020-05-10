import  fetch  from 'node-fetch';

test("twst invalid id ", async () => {
  const res = await fetch(`${process.env.TEST_HOST}/confirm/55555454`);
  const text = await res.text();
  expect(text).toEqual("invalid");
});
