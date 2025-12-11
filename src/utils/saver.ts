import { openDB } from 'idb'

// export type Data = {
//   text?: string;
//   files?: Record<string, File>;
// };
export type Data = unknown

// 更改 DB 名称以清除旧的 JSON 格式缓存
const DB_NAME = 'editor-saver-v2'
const STORE_NAME = 'history'
const EMPTY_KEY = 'new'

export const createSaver = () => {
  const init = async () => {
    const db = await openDB(DB_NAME, 1, {
      upgrade(database) {
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          database.createObjectStore(STORE_NAME)
        }
      },
    })
    return {
      db,
    }
  }
  const initd = init()

  const save = async (data: Data, key: string = EMPTY_KEY) => {
    const { db } = await initd
    const transaction = db.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    await store.put(data, key)
    await transaction.done
  }

  const read = async (key: string = EMPTY_KEY) => {
    const { db } = await initd
    const transaction = db.transaction(STORE_NAME, 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const data = await store.get(key)
    return data as Data
  }

  const clean = async (key: string = EMPTY_KEY) => {
    const { db } = await initd
    const transaction = db.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    await store.delete(key)
    return
  }

  return {
    save,
    read,
    clean,
  }
}
