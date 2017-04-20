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
import FormTextarea from 'components/forms/form-textarea';
import FormToggle from 'components/forms/form-toggle/compact';
import SectionHeader from 'components/section-header';
import WrapSettingsForm from './wrap-settings-form';

const AcceptedFilenames = ( {
	fields: {
		accepted_files,
		archives,
		author,
		category,
		feed,
		frontpage,
		home,
		pages,
		rejected_uri,
		search,
		single,
		tag,
	},
	handleChange,
	handleToggle,
	translate,
} ) => {
	return (
		<div>
			<SectionHeader label={ translate( 'Accepted Filenames & Rejected URIs' ) }>
				<Button
					compact={ true }
					primary={ true }
					type="submit">
						{ translate( 'Save Settings' ) }
				</Button>
			</SectionHeader>
			<Card>
				<form>
					<FormFieldset>
						<FormToggle
							checked={ !! single }
							onChange={ handleToggle( 'single' ) }>
							<span>
								{ translate( 'Single Posts (is_single)' ) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! pages }
							onChange={ handleToggle( 'pages' ) }>
							<span>
								{ translate( 'Pages (is_page)' ) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! frontpage }
							onChange={ handleToggle( 'frontpage' ) }>
							<span>
								{ translate( 'Front Page (is_front_page)' ) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! home }
							onChange={ handleToggle( 'home' ) }>
							<span>
								{ translate( 'Home (is_home)' ) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! archives }
							onChange={ handleToggle( 'archives' ) }>
							<span>
								{ translate( 'Archives (is_archive)' ) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! tag }
							onChange={ handleToggle( 'tag' ) }>
							<span>
								{ translate( 'Tags (is_tag)' ) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! category }
							onChange={ handleToggle( 'category' ) }>
							<span>
								{ translate( 'Category (is_category)' ) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! feed }
							onChange={ handleToggle( 'feed' ) }>
							<span>
								{ translate( 'Feeds (is_feed)' ) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! search }
							onChange={ handleToggle( 'search' ) }>
							<span>
								{ translate( 'Search Pages (is_search)' ) }
							</span>
						</FormToggle>

						<FormToggle
							checked={ !! author }
							onChange={ handleToggle( 'author' ) }>
							<span>
								{ translate( 'Author Pages (is_author)' ) }
							</span>
						</FormToggle>
						<FormSettingExplanation>
							{ translate(
								'Do not cache these page types. See the {{a}}Conditional Tags{{/a}} ' +
								'documentation for a complete discussion on each type.',
								{
									components: {
										a: (
											<ExternalLink
												icon={ true }
												target="_blank"
												href="http://codex.wordpress.org/Conditional_Tags"
											/>
										),
									}
								}
							) }
						</FormSettingExplanation>
					</FormFieldset>

					<FormFieldset>
						<FormTextarea
							onChange={ handleChange( 'rejected_uri' ) }
							value={ rejected_uri || '' } />
						<FormSettingExplanation>
							{ translate(
								'Add here strings (not a filename) that forces a page not to be cached. For example, ' +
								'if your URLs include year and you dont want to cache last year posts, it’s enough ' +
								'to specify the year, i.e. ’/2004/’. WP-Cache will search if that string is part ' +
								'of the URI and if so, it will not cache that page.'
							) }
						</FormSettingExplanation>
					</FormFieldset>

					<FormFieldset>
						<FormTextarea
							onChange={ handleChange( 'accepted_files' ) }
							value={ accepted_files || '' } />
						<FormSettingExplanation>
							{ translate(
								'Add here those filenames that can be cached, even if they match one of the rejected ' +
								'substring specified above.'
							) }
						</FormSettingExplanation>
					</FormFieldset>
				</form>
			</Card>
		</div>
	);
};

const getFormSettings = settings => {
	const textSettings = pick( settings, [
		'accepted_files',
		'rejected_uri',
	] );
	const pages = pick( settings.pages, [
		'archives',
		'author',
		'category',
		'feed',
		'frontpage',
		'home',
		'pages',
		'search',
		'single',
		'tag',
	] );

	return { ...textSettings, ...pages };
};

export default WrapSettingsForm( getFormSettings )( AcceptedFilenames );
