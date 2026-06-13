"use client"

// Imagen de proyecto con fallback: si el archivo no existe (404), se oculta
// y queda el contenedor `bg-muted`. Se usa en server components vía este wrapper
// porque `onError` es un handler de cliente.
export function ProjectImage({
  src,
  alt,
  className,
  loading,
}: {
  src: string
  alt: string
  className?: string
  loading?: "lazy" | "eager"
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      onError={(e) => {
        e.currentTarget.style.display = "none"
      }}
      className={className}
    />
  )
}
