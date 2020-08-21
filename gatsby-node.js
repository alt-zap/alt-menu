exports.createPages = async ({ actions, graphql, reporter }) => {
  // const result = await graphql(`
  //   query MyQuery {
  //     allTenant {
  //       nodes {
  //         slug
  //         id
  //       }
  //     }
  //   }
  // `)

  // if (result.errors) {
  //   reporter.panic('It wasnt possible to create the Tenant pages')
  //   reporter.panic(result.errors)
  // }

  // const { nodes: tenants } = result.data.allTenant

  // const tenantTemplate = require.resolve('./src/templates/tenant.tsx')

  // tenants.forEach(({ slug, id }) => {
  //   actions.createPage({
  //     path: `/${slug}`,
  //     component: tenantTemplate,
  //     context: {
  //       id,
  //     },
  //   })
  // })
}
