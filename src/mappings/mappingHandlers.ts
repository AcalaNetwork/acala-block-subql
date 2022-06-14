import { SubstrateBlock } from '@subql/types'
import { Block } from '../types'

export async function handleBlock(block: SubstrateBlock): Promise<void> {
  const number = block.block.header.number.toString();
  const extrinsicForSetTimestamp = block.block.extrinsics.find((item) => {
    return item.method.method === 'set'
      && item.method.section === 'timestamp'
  })
  
  const timestamp = extrinsicForSetTimestamp ? new Date(Number(extrinsicForSetTimestamp?.args?.[0].toString())) : new Date();
  const record = new Block(number);
  record.number = BigInt(number);
  record.timestamp = timestamp;
  record.hash = block.hash.toString();

  await record.save();
}
