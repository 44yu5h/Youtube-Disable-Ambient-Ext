zip:
	zip -r disable-ambient-mode-ext.zip ./manifest.json ./content.js ./popup.html ./popup.js ./LICENSE ./README.md assets/icons/*

release:
	zip -r release.zip .