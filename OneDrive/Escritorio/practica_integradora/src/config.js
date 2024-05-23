import path from 'path'

export const config = {
  SERVER: 'local',
  PORT: 5050,
  DIRNAME: path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:\/)/, '$1')), // Win
  get UPLOAD_DIR() { return `${this.DIRNAME}/public/img`},
  MONGODB_URI: 'mongodb+srv://coder53160:coder2024@clustercode.wy3nnj3.mongodb.net/coder53160'
}
