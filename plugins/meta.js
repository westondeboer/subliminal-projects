const meta = function(data) {
  const output = [];
  output.push(
    {hid: 'author', name: 'author', content: "Subliminal Projects" },
    {hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: "Subliminal Projects" },
    {hid: 'og:site_name', name: 'og:site_name', content: "Subliminal Projects" },
  )
  if (data.metaDesc) {
    output.push(
        { hid: 'description', name: 'description', content: data.metaDesc },
        { hid: 'og:description', name: 'og:description', content: data.metaDesc}
    )
  }
  if (data.title) {
    output.push(
      {hid: 'og:title', name: 'og:title', content: data.title },
    )
  }

  if (data.opengraphImage && data.opengraphImage.sourceUrl) {
    output.push(
      {hid: 'og:image', name: 'og:image', content: data.opengraphImage.sourceUrl },
    )
  }  
  return output;
}


export const metaGql = `
  seo {
    metaDesc
    title
    opengraphImage {
      sourceUrl
    }
  }      
`

export default meta;