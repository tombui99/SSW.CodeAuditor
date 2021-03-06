const fetch = require('node-fetch');
const slug = require('slug');
const endpoint =
	'https://asia-east2-sswlinkauditor-c1131.cloudfunctions.net';

exports.postData = (api, buildId, data) => {
	return fetch(`${endpoint}/api/scanresult/${api}/${buildId || '-'}`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' },
	}).then((res) => {
		if (res.ok) {
			return res.text();
		} else {
			return res.text().then((t) => {
				throw Error(t);
			});
		}
	});
};

exports.getConfigs = (api) => {
	return fetch(`${endpoint}/api/config/${api}/ignore`).then((res) => {
		if (res.ok) {
			return res.json();
		} else {
			throw Error('Failed to load config');
		}
	});
};

exports.fetchHtml = (url) => {
	return fetch(url).then((res) => {
		return res.text();
	});
};

exports.getPerfThreshold = (api, url) => {
	return fetch(
		`${endpoint}/api/config/${api}/perfthreshold/${slug(url)}`
	).then((res) => {
		if (res.ok) {
			return res.json();
		} else {
			throw Error('Failed to load config');
		}
	});
};

exports.htmlHintConfig = {
	'tagname-lowercase': false,
	'attr-lowercase': false,
	'attr-value-double-quotes': false,
	'attr-value-not-empty': false,
	'attr-no-duplication': true,
	'doctype-first': true,
	'tag-pair': false,
	'empty-tag-not-self-closed': true,
	'spec-char-escape': true,
	'id-unique': true,
	'src-not-empty': true,
	'title-require': true,
	'alt-require': true,
	'doctype-html5': false,
	// "id-class-value": "dash",
	'style-disabled': false,
	'inline-style-disabled': true,
	'inline-script-disabled': false,
	// "space-tab-mixed-disabled": "space",
	'id-class-ad-disabled': false,
	'href-abs-or-rel': false,
	'attr-unsafe-chars': true,
	'head-script-disabled': false,
};
