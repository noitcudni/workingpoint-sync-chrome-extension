# WorkingPoint Sync Chrome Extension
## Why?
If your bank can no longer sync with WorkingPoint, you are not alone. This extension allows you to upload a bank statement in one go into WorkingPoint. You'll be given the opportunity to categorize each entry.

Go to you bank's website and download the monthly statment in CSV format. The content of your CSV should look like this:
```
"Date", "Name", "Amount"
"12/01/2018", "GOOGLE AdWords", "100.2"
"12/02/2018", "GOOGLE AdWords", "80.8"
```
It will ignore the extra columns, but `Date`, `Name`, and `Amount` must be present. Note that the date format has to be in `MM/dd/YYYY` for now.


## Install from Google Webstore
Coming soon

## Installation
1. Download the extension from [github](https://github.com/noitcudni/workingpoint-sync-chrome-extension/archive/master.zip)
2. Go to **chrome://extensions/** and turn on Developer mode.
3. Click on **Load unpacked extension . . .** and load the extension.

## Usage
1. Click on the `Bulk Record Input` button on the left pane.
2. Upload your statement in CSV format.
3. Check the checkbox for the desired entries.
4. Categorize each selected entry properly. It autocompletes for you just like in the vanilla WorkingPoint.
5. Click on the ``Import Data` button.
