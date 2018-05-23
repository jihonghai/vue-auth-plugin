import Auth from '../../../src/index'

describe('auth.check', () => {
  it('should work', () => {
    const auth = new Auth({
    })
    expect(auth.check()).toEqual(true)
  })
})

describe('auth.setUser', () => {
  it('should work', () => {
    const auth = new Auth({
    })

    let user = {
      userName: 'a',
      userId: 'a'
    }

    auth.setUser(user)
    expect(auth.getUser()).toEqual(user)
  })
})

describe('auth.setPermissions', () => {
  it('should work', () => {
    const auth = new Auth({
    })

    let permissions = ['1', '2']

    auth.setPermissions(permissions)

    expect(auth.getPermissions()).toEqual(permissions)
  })
})