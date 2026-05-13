// src/components/Calculator/CalculatorSkeleton.tsx
//
// Placeholder affiché pendant le chargement lazy des composants Calculator.
// Prop `loading` du dynamic() Next.js.
//
// Design : même structure visuelle que les formulaires Calculator
// (bg-neutral-100, border-l-4, border-primary-600) pour zéro layout shift
// entre le skeleton et le vrai composant.

export default function CalculatorSkeleton() {
  return (
    <div className="max-w-6xl mx-auto" aria-hidden="true">
      <div className="bg-neutral-100 rounded-lg shadow-md p-5 sm:p-8 mb-6 border-l-4 border-primary-600 animate-pulse">
        <div className="h-6 bg-neutral-300 rounded w-48 mb-2" />
        <div className="h-4 bg-neutral-200 rounded w-72 mb-6" />
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-2">
                <div className="h-4 bg-neutral-200 rounded w-36" />
                <div className="h-8 bg-neutral-300 rounded w-28" />
              </div>
              <div className="h-2 bg-neutral-200 rounded w-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-lg border border-neutral-200 p-8 animate-pulse">
        <div className="h-6 bg-neutral-200 rounded w-56 mb-6" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border border-neutral-200 rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="h-5 bg-neutral-200 rounded w-48 mb-2" />
                  <div className="h-4 bg-neutral-100 rounded w-64" />
                </div>
                <div className="h-8 bg-neutral-200 rounded w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
