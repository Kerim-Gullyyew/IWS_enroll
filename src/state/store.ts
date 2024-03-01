import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, legacy_createStore as createStore } from 'redux'

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['parent1', 'parent2', 'count', 'student'],
}
const middleware = applyMiddleware(thunk)
const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(persistedReducer, composeWithDevTools(middleware))
export const persistor = persistStore(store)