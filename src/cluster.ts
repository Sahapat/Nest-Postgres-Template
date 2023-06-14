import cluster, { Cluster } from 'cluster'
import * as os from 'os'

const NodeCluster: Cluster = cluster

export class ClusterManager {
  // eslint-disable-next-line @typescript-eslint/ban-types
  static register(workers: number, callback: Function): void {
    if (NodeCluster) {
      process.on('SIGINT', () => {
        for (const id in NodeCluster.workers) {
          console.log(`id of cluster ${id}`)
          NodeCluster.workers[id]?.kill()
        }
        process.exit(0)
      })

      const cpus = os.cpus().length

      if (workers > cpus) {
        workers = cpus
      }

      for (let i = 0; i < workers; i++) {
        NodeCluster.fork()
      }

      NodeCluster.on('online', (worker) => {
        console.log(`Worker %s is online `, worker.process.pid)
      })

      NodeCluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`)
        console.log(`Ref code: ${code} signal: ${signal}`)
        NodeCluster.fork()
      })
    } else {
      callback()
    }
  }
}
