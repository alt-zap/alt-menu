import { Product } from '@bit/lucis.alt.typings'

export interface GatsbyProduct extends Product {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  localImage: any
}
