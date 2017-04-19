/**
 * External Dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import { getReaderFollows } from 'state/selectors';

/**
 * Internal Dependencies
 */
import ReaderImportButton from 'blocks/reader-import-button';
import ReaderExportButton from 'blocks/reader-export-button';
import SitesWindowScroller from './sites-window-scroller';
import QueryReaderFollows from 'components/data/query-reader-follows';
import FollowingManageSearchFollowed from './search-followed';

class FollowingManageSubscriptions extends Component {
	static propTypes = {
		follows: PropTypes.array.isRequired,
	}

	constructor( props ) {
		super( props );
		this.state = this.getState( props );
	}

	componentWillReceiveProps( nextProps ) {
		this.setState( this.getState( nextProps ) );
	}

	getState = ( props = this.props ) => {
		const newState = {
			subscriptions: props.follows,
		};

		if ( props.search ) {
			newState.subscriptions = this.searchSubscriptions( newState.subscriptions, props.search );
		}

		// if ( this.state && this.state.sortOrder ) {
		// 	newState.subscriptions = this.sortSubscriptions( newState.subscriptions, this.state.sortOrder );
		// }

		return newState;
	}

	searchSubscriptions( subscriptions/*, phrase*/ ) {
		return subscriptions;

		// @todo need the site and feed here, and change from immutable.js syntax
		//
		// return subscriptions.filter( function( item ) {
		// 	const feed = null; // todo grab feed and site for current sub
		// 	const site = null;
		// 	const phraseRe = new RegExp( escapeRegexp( phrase ), 'i' );

		// 	// return item.get( 'URL' ).search( phraseRe ) !== -1 ||
		// 	// 	( site && ( site.get( 'name' ) || '' ).search( phraseRe ) !== -1 ) ||
		// 	// 	( site && ( site.get( 'URL' ) || '' ).search( phraseRe ) !== -1 ) ||
		// 	// 	( feed && ( feed.name || '' ).search( phraseRe ) !== -1 ) ||
		// 	// 	( feed && ( feed.URL || '' ).search( phraseRe ) !== -1 ) ||
		// 	// 	( feed && ( feed.feed_URL || '' ).search( phraseRe ) !== -1 );
		// }, this );
	}

	render() {
		const { width, translate } = this.props;
		const subscriptions = this.state && this.state.subscriptions;

		return (
			<div className="following-manage__subscriptions">
				<QueryReaderFollows />
				<div className="following-manage__subscriptions-controls">
					{
						translate( '%(num)s Followed Sites', {
							args: { num: subscriptions.length }
						} )
					}
					<ReaderImportButton />
					<ReaderExportButton />
					<FollowingManageSearchFollowed />
				</div>
				<div className="following-manage__subscriptions-list">
					{ subscriptions &&
						<SitesWindowScroller
							sites={ subscriptions }
							width={ width } />
					}
				</div>
			</div>
		);
	}
}

export default connect(
	state => ( { follows: getReaderFollows( state ) } ),
)( localize( FollowingManageSubscriptions ) );
