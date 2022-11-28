
/**
 * @desc DB wrapper to fetch stored mangas from localStorage
 */
class DB {
  static getValue(key: string) {
    const data = localStorage.getItem(key)

    if (data !== undefined && data !== null) {
      const result = JSON.parse(data)

      return result
    }

    return null
  }

  static setValue(key: string, value: any) {
    // set the item in localstorage
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export default DB