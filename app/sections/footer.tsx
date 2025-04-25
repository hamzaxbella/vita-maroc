import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
    return (
        <footer className="bg-gray-900 rounded-t-[3rem] text-white pt-16 pb-8">
            <div className="auto-spacing">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Company Info */}
                    <div className="flex flex-col">
                        <Link href="/" className="mb-6">
                            <Image src="/logo.svg" alt="Vita Maroc" width={150} height={50}  />
                        </Link>
                        <p className="text-gray-300 text-sm mb-6">
                            Plateforme de santé qui connecte les patients aux médecins, en ligne ou à domicile.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                               className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-br from-primary to-secondary transition-all duration-300">
                                <Image src="/facebook.svg" alt="Facebook" width={20} height={20} className="brightness-0 invert" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                               className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-br from-primary to-secondary transition-all duration-300">
                                <Image src="/insta.svg" alt="Instagram" width={20} height={20} className="brightness-0 invert" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                               className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-br from-primary to-secondary transition-all duration-300">
                                <Image src="/x.png" alt="Twitter" width={20} height={20} className="brightness-0 invert" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">Navigation</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-gray-300 hover:text-primary hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors">
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-gray-300 hover:text-primary hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/doctors" className="text-gray-300 hover:text-primary hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors">
                                    Médecins
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-300 hover:text-primary hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors">
                                    À propos
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-primary hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-3">
                                    <Image src="/location.svg" alt="Adresse" width={20} height={20} className="brightness-0 invert" />
                                </div>
                                <p className="text-gray-300">123 Rue Mohammed V, Casablanca, Maroc</p>
                            </li>
                            <li className="flex items-start">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-3">
                                    <Image src="/phone-danger.svg" alt="Téléphone" width={20} height={20} className="brightness-0 invert" />
                                </div>
                                <p className="text-gray-300">+212 522 123 456</p>
                            </li>
                            <li className="flex items-start">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                                <p className="text-gray-300">contact@vita-maroc.ma</p>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">Newsletter</h3>
                        <p className="text-gray-300 mb-4">Recevez nos actualités et offres spéciales</p>
                        <form className="flex flex-col space-y-3">
                            <input 
                                type="email" 
                                placeholder="Votre adresse email" 
                                className="py-3 px-4 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary/30"
                            />
                            <button 
                                type="submit" 
                                className="bg-gradient-to-br from-primary to-secondary text-white py-3 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                            >
                                S&apos;inscrire
                            </button>
                        </form>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-700 my-8"></div>

                {/* Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} Vita Maroc. Tous droits réservés.
                    </p>
                    <div className="flex space-x-6">
                        <Link href="/terms" className="text-sm text-gray-400 hover:text-primary hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors">
                            Conditions d&apos;utilisation
                        </Link>
                        <Link href="/privacy" className="text-sm text-gray-400 hover:text-primary hover:bg-gradient-to-br hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-colors">
                            Politique de confidentialité
                        </Link>
                    </div>
                </div>
                <p className="mb-4">
                    We&apos;re committed to helping businesses succeed online.
                </p>
                <a href="#" className="text-sm text-muted-foreground hover:underline">
                    Don&apos;t sell or share my personal information
                </a>
            </div>
        </footer>
    )
}

export default Footer