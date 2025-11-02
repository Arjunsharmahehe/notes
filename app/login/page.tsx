import FaultyTerminal from "@/components/FaultyTerminal"
import { LoginForm } from "@/components/forms/login-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10" style={{ width: '100%', height: '600px', position: 'relative' }}>
        <FaultyTerminal className="absolute z-10 bg-white dark:bg-black"
          scale={2.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={1}
          pause={false}
          scanlineIntensity={1}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0}
          tint="#ffffff"
          mouseReact={true}
          mouseStrength={0.5}
          pageLoadAnimation={false}
          brightness={1}
        />
      <div className="w-full max-w-sm absolute mx-auto my-auto z-20">
        <LoginForm />
      </div>
    </div>
  )
}
