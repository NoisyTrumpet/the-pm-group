exports.updateSchema = (seo, breadcrumbs) => {
  // Replace all instances of '"/"' in seo.schema.raw with '"https://thepmgrp.com/"'
  const schemaRaw = seo.schema.raw.replace(
    /"\/"/g,
    '"https://thepmgrp.com/"',
  )

  let schemaObj = JSON.parse(schemaRaw)

  // Find breadcrumb list
  const breadcrumbIndex = schemaObj['@graph'].findIndex(
    schema => schema['@type'] === 'BreadcrumbList',
  )

  // Modify breadcrumb list
  const breadcrumbList = schemaObj['@graph'][breadcrumbIndex]
  breadcrumbList['@context'] = 'https://schema.org'
  delete breadcrumbList['@id']

  // Empty breadcrumb list
  breadcrumbList['itemListElement'] = []

  // Add custom breadcrumbs to breadcrumb list
  breadcrumbs.forEach((breadcrumb, index) => {
    const breadcrumbItem = {
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': breadcrumb.href,
        name: breadcrumb.title,
      },
    }

    breadcrumbList['itemListElement'].push(breadcrumbItem)
  })

  return JSON.stringify(schemaObj)
}
