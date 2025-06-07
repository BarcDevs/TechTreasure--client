import {SUPPORT_DETAILS} from '@/constants/footer.ts'

export const PRIVACY_RULES = [
    {
        headline: '1. Information We Collect',
        body: 'We collect personal information such as name, email, and payment details when you make a purchase or sign up for an account.'
    },
    {
        headline: '2. How We Use Your Information',
        body: 'We use your information to provide you with a personalized experience, including sending you information about products and services that you may be interested in.'
    },
    {
        headline: '3. How We Share Your Information',
        body: 'We share your information with third parties to help us provide you with a better experience, including sending you information about products and services that you may be interested in.'
    },
    {
        headline: '4. How You Can Access and Update Your Information',
        body: 'You can access and update your information by logging into your account and navigating to the "My Account" page.'
    }
]

export const FAQ: FAQ_Type[] = [
    {
        section: 'Ordering & Payment',
        questions: [
            {
                question: 'What payment methods do you accept?',
                answer:
                    'We accept Visa, MasterCard, American Express, PayPal, Apple Pay, Google Pay, and more.'
            },
            {
                question: 'Can I modify or cancel my order?',
                answer:
                    'Orders can be changed within 1 hour of placement. Contact support for assistance.'
            }
        ]
    },
    {
        section: 'Shipping & Delivery',
        questions: [
            {
                question: 'Do you offer international shipping?',
                answer:
                    'Yes, we ship worldwide! Shipping costs are calculated at checkout.'
            },
            {
                question: 'How can I track my order?',
                answer:
                    'You\'ll receive a tracking number via email once your order ships.'
            }
        ]
    },
    {
        section: 'Returns & Refunds',
        questions: [
            {
                question: 'What is your return policy?',
                answer:
                    'We offer a 30-day return policy for unused items in original condition.'
            },
            {
                question: 'How do I initiate a return?',
                answer:
                    'Contact our support team with your order number for return instructions.'
            }
        ]
    },
    {
        section: 'Customer Support',
        questions: [
            {
                question: 'How can I contact TechTreasure support?',
                answer: `Email us at ${SUPPORT_DETAILS.email} or call us at ${SUPPORT_DETAILS.phone}.`
            },
            {
                question: 'Do you offer bulk discounts?',
                answer: 'Yes! Contact us for special pricing on bulk orders.'
            }
        ]
    }
]

export const TERMS_OF_USE = [
    {
        headline: '1. Use of Website',
        content: 'You must be at least 18 years old to use this website. You agree not to use our site for any illegal or unauthorized purpose.'
    },
    {
        headline: '2. Intellectual Property',
        content: 'All content on this website is the property of TechTreasure. You may not copy, reproduce, distribute, display, perform, publish, or create derivative works from this website without our express written permission.'
    },
    {
        headline: '3. Links to Other Websites',
        content: 'Our website may contain links to other websites. We are not responsible for the content of these websites. We encourage you to read the terms and conditions and privacy policy of each website that you visit.'
    },
    {
        headline: '4. Account Responsibility',
        content: 'You are solely responsible for your account and any activity that occurs under your account. You must immediately notify us of any unauthorized use of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions.'
    },
    {
        headline: '5. Indemnification',
        content: 'You agree to defend, indemnify, and hold harmless TechTreasure and its officers, employees, agents, and affiliates from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys\' fees) arising out of or in any way related to your use of this website, including any violation of these Terms of Use.'
    },
    {
        headline: '6. Changes to Terms of Use',
        content: 'We reserve the right, at our sole discretion, to modify or replace these Terms of Use at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.'
    }
]

export type FAQ_Type = {
    section: string
    questions: FAQ_Question[]
}

export type FAQ_Question = {
    question: string
    answer: string
}

