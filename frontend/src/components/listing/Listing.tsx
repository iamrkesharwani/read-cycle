import React, { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  fullFormSchema,
  type CreateBookInput,
} from '../../../../shared/schemas/book/create.schema.js';
import { zodResolver } from '@hookform/resolvers/zod';

import Image from './Image';
import TitleAuthor from './TitleAuthor';
import Detail from './Detail';
import Description from './Description';
import Preview from './Preview';

type StepConfig = {
  component: React.ReactNode;
  fields?: (keyof CreateBookInput)[];
};

const Listing = () => {
  const [step, setStep] = useState<number>(0);

  const methods = useForm<CreateBookInput>({
    resolver: zodResolver(fullFormSchema),
    defaultValues: {
      images: [],
      title: '',
      author: '',
      genre: undefined,
      condition: undefined,
      description: '',
    },
    mode: 'onChange',
  });

  const steps: StepConfig[] = useMemo(
    () => [
      {
        component: <Image />,
        fields: ['images'],
      },
      {
        component: <TitleAuthor />,
        fields: ['title', 'author'],
      },
      {
        component: <Detail />,
        fields: ['genre', 'condition'],
      },
      {
        component: <Description />,
        fields: ['description'],
      },
      {
        component: <Preview />,
      },
    ],
    []
  );

  const totalSteps = steps.length;
  const isFirstStep = step === 0;
  const isLastStep = step === totalSteps - 1;

  const handleNext = async () => {
    const currentStep = steps[step];

    if (currentStep.fields) {
      const isValid = await methods.trigger(currentStep.fields);
      if (!isValid) return;
    }

    setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-2xl mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-2xl font-bold">Create Listing</h1>
          <p className="text-gray-500">
            Step {step + 1} of {totalSteps}
          </p>
        </header>

        <form>{steps[step].component}</form>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            disabled={isFirstStep}
            onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
          >
            Previous
          </button>

          <button type="button" disabled={isLastStep} onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </FormProvider>
  );
};

export default Listing;
