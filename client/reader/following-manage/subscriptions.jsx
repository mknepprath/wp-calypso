/**
 * External Dependencies
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';
import escapeRegexp from 'escape-string-regexp';

/**
 * Internal Dependencies
 */
import ReaderImportButton from 'blocks/reader-import-button';
import ReaderExportButton from 'blocks/reader-export-button';
import SitesWindowScroller from './sites-window-scroller';
import QueryReaderFollows from 'components/data/query-reader-follows';
import FollowingManageSearchFollowed from './search-followed';
import { getFeed as getReaderFeed } from 'state/reader/feeds/selectors';
import { getSite as getReaderSite } from 'state/reader/sites/selectors';
import { getReaderFollows } from 'state/selectors';

class FollowingManageSubscriptions extends Component {
	static propTypes = {
		follows: PropTypes.array.isRequired,
		sites: PropTypes.array.isRequired,
		feeds: PropTypes.array.isRequired,
		doSearch: PropTypes.func.isRequired,
	}

	state = { search: '' };

	filterFollowsByQuery( query ) {
		const { getFeed, getSite, follows } = this.props;

		return follows.filter( follow => {
			const feed = getFeed( follow.feed_ID ); // todo grab feed and site for current sub
			const site = getSite( follow.site_ID );
			const phraseRe = new RegExp( escapeRegexp( query ), 'i' );

			return (
				( follow.URL.search( phraseRe ) !== -1 ) ||
				( site && ( site.name || '' ).search( phraseRe ) !== -1 ) ||
				( site && ( site.URL || '' ).search( phraseRe ) !== -1 ) ||
				( feed && ( feed.name || '' ).search( phraseRe ) !== -1 ) ||
				( feed && ( feed.URL || '' ).search( phraseRe ) !== -1 ) ||
				( feed && ( feed.feed_URL || '' ).search( phraseRe ) !== -1 )
			);
		} );
	}

	render() {
		const { follows, width, translate } = this.props;
		const handleSearch = search => this.setState( { search } ); // TODO move to lib/url-search
		const filteredFollows = this.filterFollowsByQuery( this.state.search );

		return (
			<div className="following-manage__subscriptions">
				<QueryReaderFollows />
				<div className="following-manage__subscriptions-controls">
					{
						translate( '%(num)s Followed Sites', {
							args: { num: follows.length }
						} )
					}
					<ReaderImportButton />
					<ReaderExportButton />
					<FollowingManageSearchFollowed onSearch={ handleSearch } />
				</div>
				<div className="following-manage__subscriptions-list">
					{ follows &&
						<SitesWindowScroller
							sites={ filteredFollows }
							width={ width } />
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const follows = getReaderFollows( state );
	const getFeed = feedId => getReaderFeed( state, feedId );
	const getSite = siteId => getReaderSite( state, siteId );

	return { follows, getFeed, getSite };
};

export default connect(
	mapStateToProps,
)( localize( FollowingManageSubscriptions ) );
