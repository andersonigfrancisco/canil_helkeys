import { Either, left, rigth } from './either'

function doSomething(showldSucess: boolean): Either<string, number> {
  if (showldSucess) {
    return rigth(10)
  } else {
    return left('error')
  }
}

test('sucess result', () => {
  const result = rigth('sucess')
  expect(result.isRight()).toBe(true)
  expect(result.isLeft()).toBe(false)
})

test('error result', () => {
  const sucess = left('error')

  expect(sucess.value).toEqual('error')
})
