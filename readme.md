#Mainland UK postcode checker

A simple script that checks if a given postcode is part of mainland UK - so England, Scotland and Wales. It assumes that the anything offshore (Isle of Man, Isle of Wight, Shetland Islands, etc) are not part of mainland UK.

Especially handy for UK based online shops who don't want to ship offshore.

##Prerequisites

- jQuery
- Google Geocode API key (potentially - the example doesn't use one)

##Quick run-through

- User provides postcode
- Postcode is checked against a pre-defined list of non-mainland British isles postcodes
- If postcode matches any in the list, then it's **not** part of mainland UK, so show a message (or do something) and exit
- If postcode doesn't match, then pass postcode through to Google Geocode API
- Check API response to see if it includes the terms "England", "Scotland" or "Wales"
- If it does, then the postcode **is** part of mainland UK... show a message or do something if you want (and exit)
- If it doesn't, then the postcode is **not** part of mainland UK, so show a message (or do something) and exit
