import type { NodeInitializer, Node, NodeDef } from 'node-red'
import { firefox } from 'playwright'

interface Options {
  test: string
}

interface Config extends NodeDef, Options {}

const openBrowserNode: NodeInitializer = (RED): void => {
  function TransformTextNodeConstructor(this: Node, config: Config): void {
    RED.nodes.createNode(this, config)

    this.on('input', (message, send, done) => {
      done()
    })
  }

  RED.nodes.registerType('pw-open-browser', TransformTextNodeConstructor)
}

export default openBrowserNode
