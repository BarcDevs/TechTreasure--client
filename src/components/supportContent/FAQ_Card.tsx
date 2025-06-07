import {FC} from 'react'
import {FAQ_Type} from '@/constants/supportContent.ts'
import FAQ_Headline from '@/components/supportContent/FAQ_Headline.tsx'
import FAQ_Question from '@/components/supportContent/FAQ_Question.tsx'
import FAQ_Answer from '@/components/supportContent/FAQ_Answer.tsx'

type FAQ_Props = {
    FAQ_Section: FAQ_Type
}

const FAQ_Card: FC<FAQ_Props> = ({FAQ_Section}) => {
    const {section: sectionHeadline, questions} = FAQ_Section

    return (
        <div className="m-10 rounded-lg bg-white p-5 px-10 shadow">
                <FAQ_Headline>
                    {sectionHeadline}
                </FAQ_Headline>

                {questions.map(q => {
                    const {question, answer} = q

                    return (
                        <details className="mb-2">
                            <FAQ_Question>
                                {question}
                            </FAQ_Question>

                            <FAQ_Answer>
                                {answer}
                            </FAQ_Answer>
                        </details>
                    )
                })}
        </div>
    )
}

export default FAQ_Card
