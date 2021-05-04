import { API_CONFIG } from '@/api/api-config'
import { Tendermint34Client } from '@cosmjs/tendermint-rpc'

let _tendermintClient: Tendermint34Client | null

export async function initTendermintClient(): Promise<Tendermint34Client> {
  if (_tendermintClient) {
    throw new ReferenceError('Tendermint client is already initialized!')
  }
  _tendermintClient = await createTendermintClient()
  return _tendermintClient
}

export async function createTendermintClient(): Promise<Tendermint34Client> {
  return Tendermint34Client.connect(API_CONFIG.rpc)
}

export function getTendermintClient(): Tendermint34Client {
  if (!_tendermintClient) {
    throw new ReferenceError('Tendermint client not initialized!')
  }
  return _tendermintClient
}

export function clearTendermintClient(): void {
  if (_tendermintClient) {
    _tendermintClient.disconnect()
  }
  _tendermintClient = null
}
