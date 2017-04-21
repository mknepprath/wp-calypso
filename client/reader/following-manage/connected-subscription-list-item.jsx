/**
 * External Dependencies
 */
import React, { PropTypes } from 'react';
import { localize } from 'i18n-calypso';
import { noop } from 'lodash';

/**
 * Internal Dependencies
 */
import connectSite from 'lib/reader-connect-site';
import SubscriptionListItem from 'blocks/reader-subscription-list-item';

class ConnectedSubscriptionListItem extends React.Component {
	static propTypes = {
		feed: PropTypes.object,
		site: PropTypes.object,
		translate: PropTypes.func,
		feedId: PropTypes.number,
		siteId: PropTypes.number,
		onLoad: PropTypes.func,
	};

	static defaultProps = {
		onLoad: noop,
	};

	componentDidMount() {
		this.props.onLoad();
	}

	componentDidUpdate( prevProps ) {
		if ( this.props !== prevProps ) {
			this.props.onLoad();
		}
	}

	render() {
		const { feed, site, translate, url, feedId, siteId } = this.props;

		return (
			<SubscriptionListItem
				translate={ translate }
				feedId={ feedId }
				siteId={ siteId }
				site={ site }
				feed={ feed }
				url={ url }
			/>
		);
	}
}

export default localize( connectSite( ConnectedSubscriptionListItem ) );
