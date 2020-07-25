/* eslint-disable import/no-nodejs-modules */
/* eslint-disable global-require */
const crypto = require('crypto')

const report = require('gatsby-cli/lib/reporter')
const firebase = require('firebase-admin')

const getDigest = (id) => crypto.createHash('md5').update(id).digest('hex')

exports.sourceNodes = async ({ actions }) => {
  try {
    if (firebase.apps || !firebase.apps.length) {
      firebase.initializeApp({
        credential: firebase.credential.cert(require('./altzapfirebase.json')),
      })
    }
  } catch (e) {
    report.warn(
      'Could not initialize Firebase. Please check `credential` property in gatsby-config.js'
    )
    report.warn(e)

    return
  }

  const db = firebase.firestore()

  db.settings({
    timestampsInSnapshots: true,
  })

  const { createNode } = actions

  const { docs } = await db.collection('tenants').get()

  docs.forEach((doc) => {
    const tenant = doc.data()
    const hash = getDigest(doc.id)

    createNode({
      ...tenant,
      id: doc.id,
      parent: null,
      children: [],
      internal: {
        type: 'Tenant',
        contentDigest: hash,
      },
    })
  })


  // const promises = types.map(
  //   async ({ collection, type, map = (node) => node }) => {
  //     const snapshot = await db.collection(collection).get()
  //     for (let doc of snapshot.docs) {
  //       const contentDigest = getDigest(doc.id)
  //       createNode(
  //         Object.assign({}, map(doc.data()), {
  //           id: doc.id,
  //           parent: null,
  //           children: [],
  //           internal: {
  //             type,
  //             contentDigest,
  //           },
  //         })
  //       )
  //       Promise.resolve()
  //     }
  //   }
  // )
  // await Promise.all(promises)
}
