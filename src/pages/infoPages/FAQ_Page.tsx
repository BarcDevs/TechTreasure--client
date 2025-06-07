import {Link} from 'react-router-dom'
import Button from '@/components/elements/Button.tsx'
import {useTranslation} from 'react-i18next'
import {GLOBAL_LOCALES, I18N_NAMESPACES} from '@/constants/locales.ts'

const FAQ_Page = ({}) => {
    const {t} = useTranslation(I18N_NAMESPACES.global)

    return (
        <main className={'flex-center-col gap-20'}>
            <div className={'flex-center-col mt-[10px] gap-10'}>
                <h1 className={'text-big-semibold'}>Frequently Asked Questions</h1>
                <div className="space-y-6">
                    <div className="rounded-lg bg-white p-5 shadow">
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Ordering & Payment</h2>
                        <details className="mb-2">
                            <summary className="font-medium cursor-pointer">What payment methods do you accept?</summary>
                            <p className="mt-2 text-gray-600">We accept Visa, MasterCard, American Express, PayPal, Apple Pay, Google Pay, and more.</p>
                        </details>
                        <details>
                            <summary className="font-medium cursor-pointer">Can I modify or cancel my order?</summary>
                            <p className="mt-2 text-gray-600">Orders can be changed within 1 hour of placement. Contact support for assistance.</p>
                        </details>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Shipping & Delivery</h2>
                        <details className="mb-2">
                            <summary className="font-medium cursor-pointer">Do you offer international shipping?</summary>
                            <p className="mt-2 text-gray-600">Yes, we ship worldwide! Shipping costs are calculated at checkout.</p>
                        </details>
                        <details>
                            <summary className="font-medium cursor-pointer">How can I track my order?</summary>
                            <p className="mt-2 text-gray-600">You'll receive a tracking number via email once your order ships.</p>
                        </details>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Returns & Refunds</h2>
                        <details className="mb-2">
                            <summary className="font-medium cursor-pointer">What is your return policy?</summary>
                            <p className="mt-2 text-gray-600">We offer a 30-day return policy for unused items in original condition.</p>
                        </details>
                        <details>
                            <summary className="font-medium cursor-pointer">How do I initiate a return?</summary>
                            <p className="mt-2 text-gray-600">Contact our support team with your order number for return instructions.</p>
                        </details>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">Customer Support</h2>
                        <details className="mb-2">
                            <summary className="font-medium cursor-pointer">How can I contact TechTreasure support?</summary>
                            <p className="mt-2 text-gray-600">Email us at support@techtreasure.com or call us at +1 (XXX) XXX-XXXX.</p>
                        </details>
                        <details>
                            <summary className="font-medium cursor-pointer">Do you offer bulk discounts?</summary>
                            <p className="mt-2 text-gray-600">Yes! Contact us for special pricing on bulk orders.</p>
                        </details>
                    </div>
                </div>
            </div>
            <Link to={'/'}>
                <Button text={t(GLOBAL_LOCALES.backToHome)}/>
            </Link>
        </main>
    )
}


export default FAQ_Page
