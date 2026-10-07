import { useState } from 'react'

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [selected, setSelected] = useState(0)
  return (
    <div className="product-gallery">
      <div className="gallery-thumbs">
        {images.map((image, index) => (
          <button key={`${image}-${index}`} className={selected === index ? 'selected' : ''} onClick={() => setSelected(index)} aria-label={`Show product image ${index + 1}`} aria-pressed={selected === index}>
            <img src={image} alt="" />
          </button>
        ))}
      </div>
      <div className="gallery-main"><img src={images[selected]} alt={name} /></div>
    </div>
  )
}
