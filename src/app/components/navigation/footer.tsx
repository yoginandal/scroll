export function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-white/10 z-10">
      <div className="px-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600" />
              <span className="text-xl font-bold tracking-tight">
                BlizzStudios
              </span>
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              We are a creative design agency specializing in brand identity,
              web design, and digital experiences that captivate and convert.
            </p>
            <div className="flex gap-4">
              {["Twitter", "Instagram", "LinkedIn", "Dribbble"].map(
                (social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 text-white/70" />
                  </a>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                "Brand Identity",
                "Web Design",
                "UI/UX Design",
                "Motion Graphics",
                "Digital Marketing",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-cyan-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {[
                "About Us",
                "Our Work",
                "Careers",
                "Contact",
                "Privacy Policy",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-cyan-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            © 2023 BlizzStudios. All rights reserved.
          </p>
          <p className="text-white/50 text-sm mt-2 md:mt-0">
            Crafting digital wonders since 2015
          </p>
        </div>
      </div>
    </footer>
  );
}
