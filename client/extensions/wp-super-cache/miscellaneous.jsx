/**
 * External dependencies
 */
import React from 'react';
import { pick } from 'lodash';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import Card from 'components/card';
import ExternalLink from 'components/external-link';
import FormFieldset from 'components/forms/form-fieldset';
import FormSettingExplanation from 'components/forms/form-setting-explanation';
import FormToggle from 'components/forms/form-toggle/compact';
import SectionHeader from 'components/section-header';
import WrapSettingsForm from './wrap-settings-form';

const Miscellaneous = ( {
	fields: {
		cache_compression,
		cache_compression_disabled,
		cache_hello_world,
		cache_mod_rewrite,
		cache_rebuild,
		dont_cache_logged_in,
		make_known_anon,
		no_cache_for_get,
		use_304_headers,
	},
	handleToggle,
	translate,
} ) => {
	return (
		<div>
			<SectionHeader label={ translate( 'Miscellaneous' ) }>
				<Button
					compact={ true }
					primary={ true }
					type="submit">
						{ translate( 'Save Settings' ) }
				</Button>
			</SectionHeader>
			<Card>
				<form>
					{ cache_compression_disabled &&
					<p>
						{ translate(
							' {{em}}Warning! Compression is disabled as gzencode() function was not found.{{/em}}',
							{
								components: { em: <em /> }
							}
						) }
					</p>
					}
					<FormFieldset>
						{ ! cache_compression_disabled &&
						<FormToggle
							checked={ !! cache_compression }
							onChange={ handleToggle( 'cache_compression' ) }>
							<span>
								{ translate(
									'Compress pages so they’re served more quickly to visitors. {{em}}(Recommended{{/em}})',
									{
										components: { em: <em /> }
									}
								) }
							</span>
						</FormToggle>
						}

						<FormToggle
							checked={ !! dont_cache_logged_in }
							onChange={ handleToggle( 'dont_cache_logged_in' ) }>
							<span>
								{ translate(
									'Don’t cache pages for known users. {{em}}(Recommended){{/em}}',
									{
										components: { em: <em /> }
									}
								) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! cache_rebuild }
							onChange={ handleToggle( 'cache_rebuild' ) }>
							<span>
								{ translate(
									'Cache rebuild. Serve a supercache file to anonymous users while a new ' +
									'file is being generated. {{em}}(Recommended){{/em}}',
									{
										components: { em: <em /> }
									}
								) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! use_304_headers }
							disabled={ !! cache_mod_rewrite }
							onChange={ handleToggle( 'use_304_headers' ) }>
							<span>
								{ translate(
									'304 Not Modified browser caching. Indicate when a page has not been ' +
									'modified since it was last requested. {{em}}(Recommended){{/em}}',
									{
										components: { em: <em /> }
									}
								) }
							</span>
							{ cache_mod_rewrite &&
								<FormSettingExplanation>
									{ translate(
										'{{strong}}Warning! 304 browser caching is only supported when mod_rewrite caching ' +
										'is not used.{{/strong}}',
										{
											components: { strong: <strong /> }
										}
									) }
								</FormSettingExplanation>
							}
							{ ! cache_mod_rewrite &&
								<FormSettingExplanation>
									{ translate(
										'304 support is disabled by default because some hosts have had problems with the ' +
										'headers used in the past.'
									) }
								</FormSettingExplanation>
							}
						</FormToggle>

						<FormToggle
							checked={ !! no_cache_for_get }
							onChange={ handleToggle( 'no_cache_for_get' ) }>
							<span>
								{ translate( 'Don’t cache pages with GET parameters. (?x=y at the end of a url)' ) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! make_known_anon }
							onChange={ handleToggle( 'make_known_anon' ) }>
							<span>
								{ translate( 'Make known users anonymous so they’re served supercached static files.' ) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! cache_hello_world }
							onChange={ handleToggle( 'cache_hello_world' ) }>
							<span>
								{ translate( 'Proudly tell the world your server is {{fry}}Stephen Fry proof{{/fry}}! ' +
									'(places a message in your blog’s footer)',
									{
										components: {
											fry: (
												<ExternalLink
													icon={ true }
													target="_blank"
													href="https://twitter.com/#!/HibbsLupusTrust/statuses/136429993059291136"
												/>
											),
										}
									}
							) }
							</span>
						</FormToggle>
					</FormFieldset>
				</form>
			</Card>
		</div>
	);
};

const getFormSettings = settings => {
	return pick( settings, [
		'cache_compression',
		'cache_compression_disabled',
		'cache_hello_world',
		'cache_mod_rewrite',
		'cache_rebuild',
		'dont_cache_logged_in',
		'make_known_anon',
		'no_cache_for_get',
		'use_304_headers',
	] );
};

export default WrapSettingsForm( getFormSettings )( Miscellaneous );
