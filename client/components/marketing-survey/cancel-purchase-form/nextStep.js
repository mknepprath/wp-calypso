/**
 * Internal dependencies
 */
import stepsForProductAndSurvey from './stepsForProductAndSurvey';

export default function nextStep( currentStep, survey, product ) {
	const steps = stepsForProductAndSurvey( survey, product );
	const index = steps.indexOf( currentStep );

	if ( index >= 0 && index < steps.length - 1 ) {
		return steps[ index + 1 ];
	}

	return false;
}