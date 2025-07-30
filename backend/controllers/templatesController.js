import Template from '../models/Template.js';

export const getTemplates = async (req, res) => {
  try {
    let templates = await Template.find({ userId: req.userId });

    // If no templates exist, provide three default templates
    if (templates.length === 0) {
      templates = [
        { name: 'Announcement', content: `<!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<title></title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]>
<xml><w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word"><w:DontUseAdvancedTypographyReadingMail/></w:WordDocument>
<o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml>
<![endif]-->
<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		sup,
		sub {
			font-size: 75%;
			line-height: 0;
		}

		@media (max-width:670px) {

			.desktop_hide table.icons-inner,
			.social_block.desktop_hide .social-table {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.image_block div.fullWidth {
				max-width: 100% !important;
			}

			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}
		}
	</style><!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
</head>
<body class="body" style="background-color: #2d2d2d; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #2d2d2d;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="100%">
<div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;"> </div>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:30px;padding-right:30px;padding-top:10px;">
<div style="color:#8a8a8a;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:12px;line-height:1.2;text-align:right;mso-line-height-alt:14px;">
<p style="margin: 0; word-break: break-word;"><span style="word-break: break-word;"><a href="http://www.example.com" rel="noopener" style="text-decoration: underline; color: #8a8a8a;" target="_blank">View Online</a></span></p>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000405; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-top:30px;width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div style="max-width: 195px;"><a href="www.example.com" style="outline:none" tabindex="-1" target="_blank"><img alt="London Diamond Party LTD" height="auto" src="images/LDP-LOGO-2_2.png" style="display: block; height: auto; border: 0; width: 100%;" title="London Diamond Party LTD" width="195"/></a></div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-position: top center; background-repeat: repeat; color: #000000; background-color: #000405; background-image: url('images/confetti_bg_1.jpg'); width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:30px;padding-right:30px;padding-top:25px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #ffffff; direction: ltr; font-family: Tahoma, Verdana, Segoe, sans-serif; font-size: 55px; font-weight: normal; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 66px;"><strong>Join Us At The<br/>New Year's Eve Party</strong></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div class="fullWidth" style="max-width: 487.5px;"><img alt="" height="auto" src="images/2022.png" style="display: block; height: auto; border: 0; width: 100%;" title="" width="487.5"/></div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div class="fullWidth" style="max-width: 650px;"><a href="www.example.com" style="outline:none" tabindex="-1" target="_blank"><img alt="New Year's Party 2022" height="auto" src="images/hero_transparent2.png" style="display: block; height: auto; border: 0; width: 100%;" title="New Year's Party 2022" width="650"/></a></div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000405; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:20px;padding-left:30px;padding-right:30px;padding-top:10px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #ffffff; direction: ltr; font-family: Tahoma, Verdana, Segoe, sans-serif; font-size: 37px; font-weight: normal; letter-spacing: normal; line-height: 1.2; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 44px;"><strong>Celebrate with us Joe Doe!</strong></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:50px;padding-left:30px;padding-right:30px;">
<div style="color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:18px;letter-spacing:0px;line-height:1.2;text-align:left;mso-line-height-alt:22px;">
<p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;">The Celebration on the Thames is the capital's ultimate New Year experience. For one night only, London comes to life as a never-to-be-forgotten spectacular on the River Thames, featuring a unique firework display, stunning illuminated riverboats and a host of entertainment from across the globe. This year you can be here with us. </span></p>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000405; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="text-align:center;width:100%;">
<h1 style="margin: 0; color: #ffffff; direction: ltr; font-family: Tahoma, Verdana, Segoe, sans-serif; font-size: 37px; font-weight: normal; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 44px;"><strong>Event details</strong></h1>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000405; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="41.666666666666664%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:30px;padding-top:10px;">
<div align="right" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="80%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 3px solid #FFFFFF;"><span style="word-break: break-word;"> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 30px; padding-top: 5px; vertical-align: top;" width="16.666666666666668%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div style="max-width: 37.917px;"><img alt="diamond" height="auto" src="images/diamond.png" style="display: block; height: auto; border: 0; width: 100%;" title="diamond" width="37.917"/></div>
</div>
</td>
</tr>
</table>
</td>
<td class="column column-3" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="41.666666666666664%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-right:30px;padding-top:10px;">
<div align="left" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="80%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 3px solid #FFFFFF;"><span style="word-break: break-word;"> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d0a65b; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 10px; vertical-align: top;" width="100%">
<div class="spacer_block block-1" style="height:0px;line-height:0px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-8" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d0a65b; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="33.333333333333336%">
<table border="0" cellpadding="15" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment">
<div style="max-width: 65px;"><img alt="Date" height="auto" src="images/Vector_Smart_Object-2.png" style="display: block; height: auto; border: 0; width: 100%;" title="Date" width="65"/></div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:30px;padding-right:30px;">
<div style="color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:18px;line-height:1.2;text-align:center;mso-line-height-alt:22px;">
<p style="margin: 0; word-break: break-word;"><span style="word-break: break-word;"><strong><span style="word-break: break-word; color: #000000;">31/12/2021</span></strong></span></p>
<p style="margin: 0; word-break: break-word;"><span style="word-break: break-word;"><strong><span style="word-break: break-word; color: #000000;">9:00<sup>pm</sup> </span></strong></span></p>
</div>
</td>
</tr>
</table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; border-left: 2px solid #000405; border-right: 2px solid #000405; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="33.333333333333336%">
<table border="0" cellpadding="15" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment">
<div style="max-width: 53.167px;"><img alt="location" height="auto" src="images/Vector_Smart_Object-map_1.png" style="display: block; height: auto; border: 0; width: 100%;" title="location" width="53.167"/></div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;">
<div style="color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:18px;line-height:1.2;text-align:center;mso-line-height-alt:22px;">
<p style="margin: 0; word-break: break-word;"><strong><span style="word-break: break-word; color: #000000;">34 Southampton St, London WC2E 7HF</span></strong></p>
</div>
</td>
</tr>
</table>
</td>
<td class="column column-3" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="33.333333333333336%">
<table border="0" cellpadding="15" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment">
<div style="max-width: 75.833px;"><img alt="dress code" height="auto" src="images/Vector_Smart_Object-6.png" style="display: block; height: auto; border: 0; width: 100%;" title="dress code" width="75.833"/></div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;">
<div style="color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:18px;line-height:1.2;text-align:center;mso-line-height-alt:22px;">
<p style="margin: 0; word-break: break-word;"><strong><span style="word-break: break-word; color: #000000;">Evening Wear <br/>Dress Code</span></strong></p>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-9" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d0a65b; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 10px; vertical-align: top;" width="100%">
<div class="spacer_block block-1" style="height:0px;line-height:0px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-10" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000405; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 20px; vertical-align: top;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;">
<div align="center" class="alignment">
<div style="max-width: 650px;"><img alt="" height="auto" src="images/map_2.png" style="display: block; height: auto; border: 0; width: 100%;" title="" width="650"/></div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-11" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000405; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 30px; padding-top: 5px; vertical-align: top;" width="100%">
<table border="0" cellpadding="10" cellspacing="0" class="button_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment"><a href="www.example.com" style="color:#000405;text-decoration:none;" target="_blank"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="www.example.com"  style="height:50px;width:200px;v-text-anchor:middle;" arcsize="0%" fillcolor="#d0a65b">
<v:stroke dashstyle="Solid" weight="0px" color="#d0a65b"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#000405;font-family:sans-serif;font-size:20px">
<![endif]--><span class="button" style="background-color: #d0a65b; border-bottom: 0px solid transparent; border-left: 0px solid transparent; border-radius: 0px; border-right: 0px solid transparent; border-top: 0px solid transparent; color: #000405; display: inline-block; font-family: Tahoma, Verdana, Segoe, sans-serif; font-size: 20px; font-weight: undefined; mso-border-alt: none; padding-bottom: 5px; padding-top: 5px; padding-left: 30px; padding-right: 30px; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span style="font-size: 16px; word-break: break-word; line-height: 200%; mso-line-height-alt: 32px;"><strong><span data-mce-style="font-size:20px;" style="word-break: break-word; font-size: 20px;">Get directions</span></strong></span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-12" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;">
<div align="center" class="alignment">
<div style="max-width: 650px;"><img alt="" height="auto" src="images/ticket-dot-top.png" style="display: block; height: auto; border: 0; width: 100%;" title="" width="650"/></div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-13" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
<div class="spacer_block block-1" style="height:10px;line-height:10px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-14" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="text-align:center;width:100%;">
<h1 style="margin: 0; color: #000405; direction: ltr; font-family: Tahoma, Verdana, Segoe, sans-serif; font-size: 37px; font-weight: normal; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 44px;"><strong>Don't Miss Out</strong></h1>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-15" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="41.666666666666664%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:30px;padding-top:10px;">
<div align="right" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="80%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 3px solid #D0A65B;"><span style="word-break: break-word;"> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top;" width="16.666666666666668%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div style="max-width: 54.167px;"><img alt="" height="auto" src="images/tickets_2.png" style="display: block; height: auto; border: 0; width: 100%;" title="" width="54.167"/></div>
</div>
</td>
</tr>
</table>
</td>
<td class="column column-3" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="41.666666666666664%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-right:30px;padding-top:10px;">
<div align="left" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="80%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 3px solid #D0A65B;"><span style="word-break: break-word;"> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-16" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;" width="58.333333333333336%">
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:30px;padding-top:10px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #ffffff; direction: ltr; font-family: Tahoma, Verdana, Segoe, sans-serif; font-size: 39px; font-weight: normal; letter-spacing: normal; line-height: 1.2; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 47px;"><span style="word-break: break-word; color: #000000;"><strong>Book ticket today</strong></span></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:30px;padding-right:30px;padding-top:10px;">
<div style="color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:18px;line-height:1.2;text-align:left;mso-line-height-alt:22px;">
<p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #000000;">Purchase your tickets online for a chance to win a new years eve VIP prize!</span></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="button_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:30px;padding-right:30px;padding-top:10px;text-align:center;">
<div align="center" class="alignment"><a href="www.example.com" style="color:#000405;text-decoration:none;" target="_blank"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="www.example.com"  style="height:50px;width:159px;v-text-anchor:middle;" arcsize="0%" fillcolor="#d0a65b">
<v:stroke dashstyle="Solid" weight="0px" color="#d0a65b"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#000405;font-family:sans-serif;font-size:20px">
<![endif]--><span class="button" style="background-color: #d0a65b; border-bottom: 0px solid transparent; border-left: 0px solid transparent; border-radius: 0px; border-right: 0px solid transparent; border-top: 0px solid transparent; color: #000405; display: inline-block; font-family: Tahoma, Verdana, Segoe, sans-serif; font-size: 20px; font-weight: undefined; mso-border-alt: none; padding-bottom: 5px; padding-top: 5px; padding-left: 30px; padding-right: 30px; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span style="font-size: 16px; word-break: break-word; line-height: 200%; mso-line-height-alt: 32px;"><strong><span data-mce-style="font-size:20px;" style="word-break: break-word; font-size: 20px;">Book now</span></strong></span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></div>
</td>
</tr>
</table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 10px; vertical-align: top;" width="41.666666666666664%">
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-top:10px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #2d2d2d; direction: ltr; font-family: Tahoma, Verdana, Segoe, sans-serif; font-size: 31px; font-weight: normal; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 37px;"><strong>Only now</strong></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="text-align:center;width:100%;">
<h1 style="margin: 0; color: #d0a65b; direction: ltr; font-family: Tahoma, Verdana, Segoe, sans-serif; font-size: 58px; font-weight: normal; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 70px;"><strong><sup>£</sup>25.99</strong></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:20px;padding-left:40px;padding-right:40px;padding-top:10px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span style="word-break: break-word;"> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:15px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #8f8f8f; direction: ltr; font-family: Tahoma, Verdana, Segoe, sans-serif; font-size: 25px; font-weight: normal; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 30px;">Was: <span style="word-break: break-word; text-decoration: line-through;">£49.99</span></h1>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-17" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;">
<div align="center" class="alignment">
<div style="max-width: 650px;"><img alt="" height="auto" src="images/ticket-dot-bottom.png" style="display: block; height: auto; border: 0; width: 100%;" title="" width="650"/></div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-18" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000405; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-top:30px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #ffffff; direction: ltr; font-family: Tahoma, Verdana, Segoe, sans-serif; font-size: 37px; font-weight: normal; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 44px;"><strong>What happens on the date? </strong></h1>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-19" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000405; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="41.666666666666664%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:30px;padding-top:10px;">
<div align="right" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="80%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 3px solid #FFFFFF;"><span style="word-break: break-word;"> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="16.666666666666668%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div style="max-width: 37.917px;"><img alt="diamond" height="auto" src="images/diamond.png" style="display: block; height: auto; border: 0; width: 100%;" title="diamond" width="37.917"/></div>
</div>
</td>
</tr>
</table>
</td>
<td class="column column-3" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="41.666666666666664%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-right:30px;padding-top:10px;">
<div align="left" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="80%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 3px solid #FFFFFF;"><span style="word-break: break-word;"> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-20" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-position: top center; background-repeat: repeat; color: #000000; background-color: #000405; background-image: url('images/timeline-BG-slim.png'); width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;" width="50%">
<table border="0" cellpadding="30" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment">
<div style="max-width: 100px;"><img alt="Drinks" height="auto" src="images/Vector_Smart_Object-3.png" style="display: block; height: auto; border: 0; width: 100%;" title="Drinks" width="100"/></div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:30px;padding-right:30px;padding-top:10px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="80%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 3px solid #FFFFFF;"><span style="word-break: break-word;"> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-right:20px;padding-top:30px;">
<div style="color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:26px;line-height:1.2;text-align:center;mso-line-height-alt:31px;">
<p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;"><strong><span style="word-break: break-word;"><span style="word-break: break-word;">10:00</span> <sup>pm</sup></span></strong></span></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:30px;padding-right:30px;">
<div style="color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:18px;line-height:1.2;text-align:center;mso-line-height-alt:22px;">
<p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;">Battle of the DJs</span></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:30px;padding-right:30px;padding-top:10px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="80%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 3px solid #FFFFFF;"><span style="word-break: break-word;"> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="30" cellspacing="0" class="image_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment">
<div style="max-width: 93px;"><img alt="Costume" height="auto" src="images/Vector_Smart_Object-1.png" style="display: block; height: auto; border: 0; width: 100%;" title="Costume" width="93"/></div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:30px;padding-right:30px;padding-top:10px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="80%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 3px solid #FFFFFF;"><span style="word-break: break-word;"> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-8" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-right:20px;padding-top:30px;">
<div style="color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:26px;line-height:1.2;text-align:center;mso-line-height-alt:31px;">
<p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;"><strong><span style="word-break: break-word;"><span style="word-break: break-word;">11:59 </span><sup>pm </sup>50<sup> sec</sup></span></strong></span></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-9" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:30px;padding-right:30px;">
<div style="color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:18px;line-height:1.2;text-align:center;mso-line-height-alt:22px;">
<p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;">The final countdown</span></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-10" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:30px;padding-right:30px;padding-top:10px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="80%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 3px solid #FFFFFF;"><span style="word-break: break-word;"> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="30" cellspacing="0" class="image_block block-11" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment">
<div style="max-width: 93px;"><img alt="fireworks" height="auto" src="images/Vector_Smart_Object-5.png" style="display: block; height: auto; border: 0; width: 100%;" title="fireworks" width="93"/></div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-12" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:30px;padding-right:30px;padding-top:10px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="80%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 3px solid #FFFFFF;"><span style="word-break: break-word;"> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;" width="50%">
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-right:20px;padding-top:30px;">
<div style="color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:26px;line-height:1.2;text-align:center;mso-line-height-alt:31px;">
<p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;"><strong><span style="word-break: break-word;"><span style="word-break: break-word;">9:00</span> <sup>pm</sup></span></strong></span></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:50px;padding-left:30px;padding-right:30px;">
<div style="color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:18px;line-height:1.2;text-align:center;mso-line-height-alt:22px;">
<p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;">Welcome drink </span></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:30px;padding-right:30px;padding-top:10px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="80%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 3px solid #FFFFFF;"><span style="word-break: break-word;"> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="30" cellspacing="0" class="image_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment">
<div style="max-width: 91px;"><img alt="Music" height="auto" src="images/Vector_Smart_Object-7.png" style="display: block; height: auto; border: 0; width: 100%;" title="Music" width="91"/></div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:30px;padding-right:30px;padding-top:10px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="80%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 3px solid #FFFFFF;"><span style="word-break: break-word;"> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-right:20px;padding-top:30px;">
<div style="color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:26px;line-height:1.2;text-align:center;mso-line-height-alt:31px;">
<p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;"><strong><span style="word-break: break-word;"><span style="word-break: break-word;">11:00</span> <sup>pm</sup></span></strong></span></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:30px;padding-right:30px;">
<div style="color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:18px;line-height:1.2;text-align:center;mso-line-height-alt:22px;">
<p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;"><span style="word-break: break-word;">Costume Contest</span></span></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-8" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:30px;padding-right:30px;padding-top:10px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="80%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 3px solid #FFFFFF;"><span style="word-break: break-word;"> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="30" cellspacing="0" class="image_block block-9" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment">
<div style="max-width: 91px;"><img alt="Countdown" height="auto" src="images/Vector_Smart_Object-4.png" style="display: block; height: auto; border: 0; width: 100%;" title="Countdown" width="91"/></div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-10" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:30px;padding-right:30px;padding-top:10px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="80%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 3px solid #FFFFFF;"><span style="word-break: break-word;"> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-11" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-right:20px;padding-top:30px;">
<div style="color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:26px;line-height:1.2;text-align:center;mso-line-height-alt:31px;">
<p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;"><strong><span style="word-break: break-word;"><span style="word-break: break-word;">12:00</span> <sup>am</sup></span></strong></span></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-12" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:45px;padding-left:30px;padding-right:30px;">
<div style="color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:18px;line-height:1.2;text-align:center;mso-line-height-alt:22px;">
<p style="margin: 0; word-break: break-word;"><span style="word-break: break-word; color: #ffffff;"><span style="word-break: break-word;">Fireworks show</span></span></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-13" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:30px;padding-left:30px;padding-right:30px;padding-top:10px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="80%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 3px solid #FFFFFF;"><span style="word-break: break-word;"> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-21" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000405; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: top;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div class="fullWidth" style="max-width: 422.5px;"><img alt="" height="auto" src="images/bic_1.png" style="display: block; height: auto; border: 0; width: 100%;" title="" width="422.5"/></div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-22" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d0a65b; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-top:30px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #000405; direction: ltr; font-family: Tahoma, Verdana, Segoe, sans-serif; font-size: 42px; font-weight: normal; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 50px;"><strong>Hope to see you soon</strong></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:30px;padding-right:30px;padding-top:5px;">
<div style="color:#000405;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:20px;line-height:1.2;text-align:center;mso-line-height-alt:24px;">
<p style="margin: 0; word-break: break-word;"><span style="word-break: break-word;"><span style="word-break: break-word;">Meanwhile follow Us on social media: </span></span></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="social_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:20px;padding-left:20px;padding-right:20px;text-align:center;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;" width="260px">
<tr>
<td style="padding:0 10px 0 10px;"><a href="https://www.facebook.com" target="_blank"><img alt="Facebook" height="auto" src="images/facebook2x.png" style="display: block; height: auto; border: 0;" title="Facebook" width="32"/></a></td>
<td style="padding:0 10px 0 10px;"><a href="https://www.twitter.com" target="_blank"><img alt="Twitter" height="auto" src="images/twitter2x.png" style="display: block; height: auto; border: 0;" title="Twitter" width="32"/></a></td>
<td style="padding:0 10px 0 10px;"><a href="https://www.instagram.com" target="_blank"><img alt="Instagram" height="auto" src="images/instagram2x.png" style="display: block; height: auto; border: 0;" title="Instagram" width="32"/></a></td>
<td style="padding:0 10px 0 10px;"><a href="https://www.snapchat.com" target="_blank"><img alt="Snapchat" height="auto" src="images/snapchat2x.png" style="display: block; height: auto; border: 0;" title="Snapchat" width="32"/></a></td>
<td style="padding:0 10px 0 10px;"><a href="https://www.youtube.com" target="_blank"><img alt="YouTube" height="auto" src="images/youtube2x.png" style="display: block; height: auto; border: 0;" title="YouTube" width="32"/></a></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-23" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:30px;padding-right:30px;padding-top:10px;">
<div style="color:#8a8a8a;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:1.2;text-align:left;mso-line-height-alt:17px;">
<p style="margin: 0; word-break: break-word;">Terms and conditions apply. </p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:30px;padding-right:30px;padding-top:10px;">
<div style="color:#8a8a8a;font-family:Tahoma, Verdana, Segoe, sans-serif;font-size:14px;line-height:1.2;text-align:left;mso-line-height-alt:17px;">
<p style="margin: 0; word-break: break-word;">This email was sent by <a href="http://www.example.com" rel="noopener" style="color: #d0a65b;" target="_blank">Handmade Limited</a>, (276) 686-9121 1314 Radio Dr Rural Retreat, Virginia(VA), 24368</p>
<p style="margin: 0; word-break: break-word;"> </p>
<p style="margin: 0; word-break: break-word;">If you do not wish to receive these updates, please <a href="#" rel="noopener" style="color: #d0a65b;" target="_blank">unsubscribe here</a>.</p>
</div>
</td>
</tr>
</table>
<div class="spacer_block block-3" style="height:20px;line-height:20px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-24" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 650px; margin: 0 auto;" width="650">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center; line-height: 0;" width="100%">
<tr>
<td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
<!--[if !vml]><!-->
<table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; padding-left: 0px; padding-right: 0px;"><!--<![endif]-->
<tr>
<td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 6px;"><a href="http://designedwithbeefree.com/" style="text-decoration: none;" target="_blank"><img align="center" alt="Beefree Logo" class="icon" height="auto" src="images/Beefree-logo.png" style="display: block; height: auto; margin: 0 auto; border: 0;" width="34"/></a></td>
<td style="font-family: 'Inter', sans-serif; font-size: 15px; font-weight: undefined; color: #1e0e4b; vertical-align: middle; letter-spacing: undefined; text-align: center; line-height: normal;"><a href="http://designedwithbeefree.com/" style="color: #1e0e4b; text-decoration: none;" target="_blank">Designed with Beefree</a></td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table><!-- End -->
</body>
</html>`, category: 'announcement' },
        { name: 'Promotional', content: `<!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<title></title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]>
<xml><w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word"><w:DontUseAdvancedTypographyReadingMail/></w:WordDocument>
<o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml>
<![endif]--><!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"/><!--<![endif]-->
<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		sup,
		sub {
			font-size: 75%;
			line-height: 0;
		}

		.menu_block.desktop_hide .menu-links span {
			mso-hide: all;
		}

		.row-13 .column-2 .block-2 .button:hover,
		.row-17 .column-2 .block-2 .button:hover,
		.row-2 .column-1 .block-6 .button:hover {
			background-color: transparent !important;
			border-bottom: 1px solid #9e940e !important;
			border-left: 1px solid #9e940e !important;
			border-right: 1px solid #9e940e !important;
			border-top: 1px solid #9e940e !important;
			color: #9e940e !important;
		}

		.row-10 .column-1 .block-3 .button:hover,
		.row-11 .column-2 .block-3 .button:hover,
		.row-9 .column-2 .block-3 .button:hover {
			background-color: #9e940e !important;
			border-bottom: 1px solid #ffe5de !important;
			border-left: 1px solid #ffe5de !important;
			border-right: 1px solid #ffe5de !important;
			border-top: 1px solid #ffe5de !important;
			color: #ffe5de !important;
		}

		@media (max-width:700px) {

			.desktop_hide table.icons-inner,
			.row-17 .column-2 .block-2.button_block .alignment .button,
			.row-20 .column-2 .block-1.social_block .alignment table,
			.social_block.desktop_hide .social-table {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.image_block div.fullWidth {
				max-width: 100% !important;
			}

			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}

			.reverse {
				display: table;
				width: 100%;
			}

			.reverse .column.first {
				display: table-footer-group !important;
			}

			.reverse .column.last {
				display: table-header-group !important;
			}

			.row-10 td.column.first .border {
				padding: 0;
				border-top: 1px dashed #ffe5de;
				border-right: 1px dashed #ffe5de;
				border-bottom: 1px dashed #ffe5de;
				border-left: 1px dashed #ffe5de;
			}

			.row-10 td.column.last .border {
				padding: 0;
			}

			.row-2 .column-1 .block-4.paragraph_block td.pad {
				padding: 10px 15px !important;
			}

			.row-4 .column-2 .block-1.paragraph_block td.pad>div {
				font-size: 75px !important;
			}

			.row-14 .column-1,
			.row-17 .column-1,
			.row-17 .column-2 .block-1.paragraph_block td.pad,
			.row-4 .column-2 .block-1.paragraph_block td.pad {
				padding: 0 !important;
			}

			.row-13 .column-1 .block-2.heading_block h2,
			.row-17 .column-1 .block-1.heading_block h2,
			.row-6 .column-1 .block-1.heading_block h2,
			.row-8 .column-1 .block-2.heading_block h2 {
				font-size: 38px !important;
			}

			.row-8 .column-1 .block-3.paragraph_block td.pad {
				padding: 10px 25px !important;
			}

			.row-10 .column-2 .block-1.image_block .alignment div,
			.row-11 .column-1 .block-1.image_block .alignment div,
			.row-9 .column-1 .block-1.image_block .alignment div {
				margin: 0 auto !important;
			}

			.row-13 .column-1 .block-2.heading_block h2,
			.row-17 .column-1 .block-1.heading_block h2,
			.row-17 .column-2 .block-1.paragraph_block td.pad>div,
			.row-17 .column-2 .block-2.button_block .alignment,
			.row-20 .column-2 .block-1.social_block .alignment,
			.row-21 .column-1 .block-2.menu_block .alignment {
				text-align: center !important;
			}

			.row-10 .row-content,
			.row-11 .row-content,
			.row-16 .column-1 .block-1.divider_block td.pad,
			.row-9 .row-content {
				padding: 10px !important;
			}

			.row-16 .column-1 .block-1.divider_block .alignment table {
				display: inline-table;
			}

			.row-17 .column-2 .block-2.button_block span {
				line-height: 32px !important;
			}

			.row-14 .row-content,
			.row-15 .row-content {
				padding: 0 5px 5px !important;
			}

			.row-10 .column-1 .border,
			.row-11 .column-2,
			.row-7 .column-3,
			.row-9 .column-2 {
				padding: 5px !important;
			}

			.row-15 .column-1,
			.row-15 .column-2,
			.row-15 .column-3 {
				padding: 0 0 5px !important;
			}
		}
	</style><!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
</head>
<body class="body" style="background-color: #beb41e; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #beb41e;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-repeat: no-repeat; background-color: #f9f8f6; background-image: url('images/Easter_HeroBackground.png'); color: #000000; width: 680px; margin: 0 auto;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="100%">
<div class="spacer_block block-1" style="height:21px;line-height:21px;font-size:1px;"> </div>
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div style="max-width: 204px;"><img alt="Your Logo Placeholder" height="auto" src="images/Easter_YourLogo.png" style="display: block; height: auto; border: 0; width: 100%;" title="Your Logo Placeholder" width="204"/></div>
</div>
</td>
</tr>
</table>
<div class="spacer_block block-3" style="height:21px;line-height:21px;font-size:1px;"> </div>
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;">
<div align="center" class="alignment">
<div style="max-width: 680px;"><img alt="Hero Text" height="auto" src="images/Easter_HeroText.png" style="display: block; height: auto; border: 0; width: 100%;" title="Hero Text" width="680"/></div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;">
<div align="center" class="alignment">
<div style="max-width: 680px;"><img alt="Hero Image" height="auto" src="images/Easter_Hero.png" style="display: block; height: auto; border: 0; width: 100%;" title="Hero Image" width="680"/></div>
</div>
</td>
</tr>
</table>
<div class="spacer_block block-6" style="height:21px;line-height:21px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-repeat: no-repeat; background-color: #f9f8f6; background-image: url('images/Easter_TextBG.png'); background-size: cover; border-radius: 0; color: #000000; padding: 25px; width: 680px; margin: 0 auto;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-radius: 15px;" width="100%">
<div class="spacer_block block-1" style="height:21px;line-height:21px;font-size:1px;"> </div>
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div style="max-width: 95.2px;"><img alt="Icon" height="auto" src="images/Easter_Icon_1.png" style="display: block; height: auto; border: 0; width: 100%;" title="Icon" width="95.2"/></div>
</div>
</td>
</tr>
</table>
<div class="spacer_block block-3" style="height:21px;line-height:21px;font-size:1px;"> </div>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:60px;padding-right:60px;padding-top:10px;">
<div style="color:#232420;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:19px;">
<p style="margin: 0; margin-bottom: 16px;"><strong>Spring is in the air, and Easter is the perfect time to gather, unwind, and savor something special.</strong></p>
<p style="margin: 0;">Whether you're toasting to new beginnings or simply indulging in a seasonal treat, our handcrafted beverages bring the perfect balance of flavor and freshness to your celebration.</p>
</div>
</td>
</tr>
</table>
<div class="spacer_block block-5" style="height:21px;line-height:21px;font-size:1px;"> </div>
<table border="0" cellpadding="10" cellspacing="0" class="button_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment"><a href="https://www.example.com" style="color:#ffe5de;text-decoration:none;" target="_blank"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://www.example.com"  style="height:42px;width:205px;v-text-anchor:middle;" arcsize="9%" fillcolor="#9e940e">
<v:stroke dashstyle="Solid" weight="1px" color="#9e940e"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffe5de;font-family:Arial, sans-serif;font-size:16px">
<![endif]--><span class="button" style="background-color: #9e940e; border-bottom: 1px solid #9e940e; border-left: 1px solid #9e940e; border-radius: 4px; border-right: 1px solid #9e940e; border-top: 1px solid #9e940e; color: #ffe5de; display: inline-block; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700; mso-border-alt: none; padding-bottom: 5px; padding-top: 5px; padding-left: 20px; padding-right: 20px; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span style="word-break: break-word; line-height: 32px;">HOP OVER THE SALE</span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></div>
</td>
</tr>
</table>
<div class="spacer_block block-7" style="height:21px;line-height:21px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f8f6; border-radius: 0; color: #000000; width: 680px; margin: 0 auto;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;">
<div align="center" class="alignment">
<div style="max-width: 680px;"><img alt="Section Arc" height="auto" src="images/Easter_DiscountBG1.png" style="display: block; height: auto; border: 0; width: 100%;" title="Section Arc" width="680"/></div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto; background-color: #9e940e; border-radius: 0; color: #000000; width: 680px; margin: 0 auto;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;" width="25%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="left" class="alignment">
<div style="max-width: 170px;"><img alt="Product Image" height="auto" src="images/Easter_ProductHighlight1_1.png" style="display: block; height: auto; border: 0; width: 100%;" title="Product Image" width="170"/></div>
</div>
</td>
</tr>
</table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;" width="50%">
<table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad">
<div style="color:#f9f8f6;direction:ltr;font-family:'Oswald', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:150px;font-weight:700;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:180px;">
<p style="margin: 0;">25%</p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad">
<div style="color:#f9f8f6;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:19px;">
<p style="margin: 0;">OFF OUR SIGNATURE DRINKS!</p>
</div>
</td>
</tr>
</table>
</td>
<td class="column column-3" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;" width="25%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="right" class="alignment">
<div style="max-width: 170px;"><img alt="Product Image" height="auto" src="images/Easter_ProductHighlight2_1.png" style="display: block; height: auto; border: 0; width: 100%;" title="Product Image" width="170"/></div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f8f6; border-radius: 0; color: #000000; width: 680px; margin: 0 auto;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;">
<div align="center" class="alignment">
<div style="max-width: 680px;"><img alt="Section Arc" height="auto" src="images/Easter_DiscountBG2.png" style="display: block; height: auto; border: 0; width: 100%;" title="Section Arc" width="680"/></div>
</div>
</td>
</tr>
</table>
<div class="spacer_block block-2" style="height:21px;line-height:21px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f8f6; border-radius: 0; color: #000000; width: 680px; margin: 0 auto;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="100%">
<table border="0" cellpadding="10" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<h2 style="margin: 0; color: #9e940e; direction: ltr; font-family: 'Oswald', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 56px; font-weight: 700; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 67px;">WHY YOU'LL LOVE OUR DRINKS</h2>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f8f6; border-radius: 0; color: #000000; padding: 25px; width: 680px; margin: 0 auto;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #f9f8f6; border-bottom: 1px dashed #ffb9a5; border-left: 1px dashed #ffb9a5; border-right: 1px dashed #ffb9a5; border-top: 1px dashed #ffb9a5; padding-bottom: 5px; padding-left: 5px; padding-right: 5px; padding-top: 5px; vertical-align: top; border-radius: 3px;" width="33.333333333333336%">
<div class="spacer_block block-1" style="height:21px;line-height:21px;font-size:1px;"> </div>
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div style="max-width: 90.16px;"><img alt="Orange Icon" height="auto" src="images/Easter_ProductHighlight_Icon1.png" style="display: block; height: auto; border: 0; width: 100%;" title="Orange Icon" width="90.16"/></div>
</div>
</td>
</tr>
</table>
<div class="spacer_block block-3" style="height:21px;line-height:21px;font-size:1px;"> </div>
<table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad">
<div style="color:#232420;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:19px;">
<p style="margin: 0;"><strong>Real Fruit, Real Flavor</strong></p>
</div>
</td>
</tr>
</table>
<div class="spacer_block block-5" style="height:21px;line-height:21px;font-size:1px;"> </div>
</td>
<td class="column gap" style="vertical-align: top; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left;">
<table height="15" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 15px; height: 15px;" width="15"></table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #f9f8f6; border-bottom: 1px dashed #ffb9a5; border-left: 1px dashed #ffb9a5; border-right: 1px dashed #ffb9a5; border-top: 1px dashed #ffb9a5; padding-bottom: 5px; padding-left: 5px; padding-right: 5px; padding-top: 5px; vertical-align: top; border-radius: 3px;" width="33.333333333333336%">
<div class="spacer_block block-1" style="height:21px;line-height:21px;font-size:1px;"> </div>
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div style="max-width: 90.16px;"><img alt="Heart Icon" height="auto" src="images/Easter_ProductHighlight_Icon2.png" style="display: block; height: auto; border: 0; width: 100%;" title="Heart Icon" width="90.16"/></div>
</div>
</td>
</tr>
</table>
<div class="spacer_block block-3" style="height:21px;line-height:21px;font-size:1px;"> </div>
<table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad">
<div style="color:#232420;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:19px;">
<p style="margin: 0;"><strong>Cool & Refreshing</strong></p>
</div>
</td>
</tr>
</table>
<div class="spacer_block block-5" style="height:21px;line-height:21px;font-size:1px;"> </div>
</td>
<td class="column gap" style="vertical-align: top; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left;">
<table height="15" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 15px; height: 15px;" width="15"></table>
</td>
<td class="column column-3" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #f9f8f6; border-bottom: 1px dashed #ffb9a5; border-left: 1px dashed #ffb9a5; border-right: 1px dashed #ffb9a5; border-top: 1px dashed #ffb9a5; padding-bottom: 5px; padding-left: 5px; padding-right: 5px; padding-top: 5px; vertical-align: top; border-radius: 3px;" width="33.333333333333336%">
<div class="spacer_block block-1" style="height:21px;line-height:21px;font-size:1px;"> </div>
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div style="max-width: 90.16px;"><img alt="Leaves Icon" height="auto" src="images/Easter_ProductHighlight_Icon3.png" style="display: block; height: auto; border: 0; width: 100%;" title="Leaves Icon" width="90.16"/></div>
</div>
</td>
</tr>
</table>
<div class="spacer_block block-3" style="height:21px;line-height:21px;font-size:1px;"> </div>
<table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad">
<div style="color:#232420;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:19px;">
<p style="margin: 0;"><strong>No Artificial Flavors</strong></p>
</div>
</td>
</tr>
</table>
<div class="spacer_block block-5" style="height:21px;line-height:21px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-8" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-repeat: no-repeat; background-color: #9e940e; border-radius: 0; color: #000000; background-size: auto; background-image: url('images/Easter_ProductCollection_BG1.png'); width: 680px; margin: 0 auto;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;" width="100%">
<div class="spacer_block block-1" style="height:21px;line-height:21px;font-size:1px;"> </div>
<table border="0" cellpadding="10" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<h2 style="margin: 0; color: #f9f8f6; direction: ltr; font-family: 'Oswald', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 56px; font-weight: 700; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 67px;"><span class="tinyMce-placeholder" style="word-break: break-word;">SPRING SIPS<br/>COLLECTION</span></h2>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:60px;padding-right:60px;padding-top:10px;">
<div style="color:#f9f8f6;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:19px;">
<p style="margin: 0;">From fruity blends to botanical-infused delights, sip into the season with our bestsellers.</p>
</div>
</td>
</tr>
</table>
<div class="spacer_block block-4" style="height:21px;line-height:21px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-9" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #9e940e; border-radius: 0; color: #000000; background-size: auto; padding: 10px 30px; width: 680px; margin: 0 auto;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle; border-radius: 3px 3px 3px 3px;" width="41.666666666666664%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div class="fullWidth" style="max-width: 226.667px;"><img alt="Product Image with Background" height="auto" src="images/Easter_Product1_1.png" style="display: block; height: auto; border: 0; width: 100%; border-radius: 3px;" title="Product Image with Background" width="226.667"/></div>
</div>
</td>
</tr>
</table>
</td>
<td class="column gap" style="vertical-align: top; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left;">
<table height="10" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 10px; height: 10px;" width="10"></table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; border-bottom: 1px dashed #ffe5de; border-left: 1px dashed #ffe5de; border-right: 1px dashed #ffe5de; border-top: 1px dashed #ffe5de; padding-bottom: 5px; padding-left: 5px; padding-right: 5px; padding-top: 5px; vertical-align: middle; border-radius: 3px 3px 3px 3px;" width="58.333333333333336%">
<table border="0" cellpadding="10" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<h3 style="margin: 0; color: #f9f8f6; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 29px;">Tangerine Sunrise<br/></h3>
</td>
</tr>
</table>
<table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad">
<div style="color:#f9f8f6;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:19px;">
<p style="margin: 0;">A bold citrus awakening with a sun-kissed zest, designed to ignite your senses and brighten your day.</p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="10" cellspacing="0" class="button_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment"><a href="https://www.example.com" style="color:#9e940e;text-decoration:none;" target="_blank"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://www.example.com"  style="height:42px;width:189px;v-text-anchor:middle;" arcsize="9%" fillcolor="#ffe5de">
<v:stroke dashstyle="Solid" weight="1px" color="#ffe5de"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#9e940e;font-family:Arial, sans-serif;font-size:16px">
<![endif]--><span class="button" style="background-color: #ffe5de; border-bottom: 1px solid #ffe5de; border-left: 1px solid #ffe5de; border-radius: 4px; border-right: 1px solid #ffe5de; border-top: 1px solid #ffe5de; color: #9e940e; display: inline-block; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700; mso-border-alt: none; padding-bottom: 5px; padding-top: 5px; padding-left: 20px; padding-right: 20px; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span style="word-break: break-word; line-height: 32px;">SHOP EMBERGATE</span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-10" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding: 10px 30px; background-color: #9e940e; border-radius: 0; color: #000000; width: 680px; margin: 0 auto;" width="680">
<tbody>
<tr class="reverse">
<td class="column column-1 first" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; border-bottom: 1px dashed #ffe5de; border-left: 1px dashed #ffe5de; border-right: 1px dashed #ffe5de; border-top: 1px dashed #ffe5de; vertical-align: middle; border-radius: 3px;" width="58.333333333333336%">
<div class="border">
<table border="0" cellpadding="10" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<h3 style="margin: 0; color: #f9f8f6; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 29px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Strawberry Spritz<br/></span></h3>
</td>
</tr>
</table>
<table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad">
<div style="color:#f9f8f6;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:19px;">
<p style="margin: 0;">A sweet, tangy effervescence that lifts your mood—like the perfect golden-hour glow in a glass.</p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="10" cellspacing="0" class="button_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment"><a href="https://www.example.com" style="color:#9e940e;text-decoration:none;" target="_blank"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://www.example.com"  style="height:42px;width:181px;v-text-anchor:middle;" arcsize="9%" fillcolor="#ffe5de">
<v:stroke dashstyle="Solid" weight="1px" color="#ffe5de"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#9e940e;font-family:Arial, sans-serif;font-size:16px">
<![endif]--><span class="button" style="background-color: #ffe5de; border-bottom: 1px solid #ffe5de; border-left: 1px solid #ffe5de; border-radius: 4px; border-right: 1px solid #ffe5de; border-top: 1px solid #ffe5de; color: #9e940e; display: inline-block; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700; mso-border-alt: none; padding-bottom: 5px; padding-top: 5px; padding-left: 20px; padding-right: 20px; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span style="word-break: break-word; line-height: 32px;">SHOP GLOWGATE</span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></div>
</td>
</tr>
</table>
</div>
</td>
<td class="column gap" style="vertical-align: top; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left;">
<table height="10" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 10px; height: 10px;" width="10"></table>
</td>
<td class="column column-2 last" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle; border-radius: 3px;" width="41.666666666666664%">
<div class="border">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div class="fullWidth" style="max-width: 221px;"><img alt="Product Image with Background" height="auto" src="images/Easter_Product3_1.png" style="display: block; height: auto; border: 0; width: 100%; border-radius: 3px;" title="Product Image with Background" width="221"/></div>
</div>
</td>
</tr>
</table>
</div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-11" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-repeat: no-repeat; padding: 10px 30px; background-color: #9e940e; border-radius: 0; color: #000000; background-image: url('images/Easter_ProductCollection_BG2.png'); background-size: auto; width: 680px; margin: 0 auto;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle; border-radius: 3px 3px 3px 3px;" width="41.666666666666664%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div class="fullWidth" style="max-width: 226.667px;"><img alt="Product Image with Background" height="auto" src="images/Easter_Product2_1.png" style="display: block; height: auto; border: 0; width: 100%; border-radius: 3px;" title="Product Image with Background" width="226.667"/></div>
</div>
</td>
</tr>
</table>
</td>
<td class="column gap" style="vertical-align: top; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left;">
<table height="10" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 10px; height: 10px;" width="10"></table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; border-bottom: 1px dashed #ffe5de; border-left: 1px dashed #ffe5de; border-right: 1px dashed #ffe5de; border-top: 1px dashed #ffe5de; padding-bottom: 5px; padding-left: 5px; padding-right: 5px; padding-top: 5px; vertical-align: middle; border-radius: 3px 3px 3px 3px;" width="58.333333333333336%">
<table border="0" cellpadding="10" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<h3 style="margin: 0; color: #f9f8f6; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 700; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 29px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Lychee Bloom<br/></span></h3>
</td>
</tr>
</table>
<table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad">
<div style="color:#f9f8f6;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:19px;">
<p style="margin: 0;">Delicate, floral, and refreshingly smooth— like a sip of serenity in full bloom.</p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="10" cellspacing="0" class="button_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment"><a href="https://www.example.com" style="color:#9e940e;text-decoration:none;" target="_blank"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://www.example.com"  style="height:42px;width:191px;v-text-anchor:middle;" arcsize="9%" fillcolor="#ffe5de">
<v:stroke dashstyle="Solid" weight="1px" color="#ffe5de"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#9e940e;font-family:Arial, sans-serif;font-size:16px">
<![endif]--><span class="button" style="background-color: #ffe5de; border-bottom: 1px solid #ffe5de; border-left: 1px solid #ffe5de; border-radius: 4px; border-right: 1px solid #ffe5de; border-top: 1px solid #ffe5de; color: #9e940e; display: inline-block; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700; mso-border-alt: none; padding-bottom: 5px; padding-top: 5px; padding-left: 20px; padding-right: 20px; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span style="word-break: break-word; line-height: 32px;">SHOP DREAMGATE</span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-12" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; background-color: #9e940e; width: 680px; margin: 0 auto;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
<div class="spacer_block block-1" style="height:21px;line-height:21px;font-size:1px;"> </div>
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;">
<div align="center" class="alignment">
<div style="max-width: 680px;"><img alt="Product Image Lifestyle" height="auto" src="images/Easter_ProductImage.png" style="display: block; height: auto; border: 0; width: 100%;" title="Product Image Lifestyle" width="680"/></div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-13" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f8f6; border-radius: 0; color: #000000; width: 680px; margin: 0 auto;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;" width="66.66666666666667%">
<div class="spacer_block block-1" style="height:21px;line-height:21px;font-size:1px;"> </div>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:4px;text-align:center;width:100%;">
<h2 style="margin: 0; color: #9e940e; direction: ltr; font-family: 'Oswald', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 56px; font-weight: 700; letter-spacing: normal; line-height: 1.2; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 67px;"><span class="tinyMce-placeholder" style="word-break: break-word;"> STAY CONNECTED</span></h2>
</td>
</tr>
</table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;" width="33.333333333333336%">
<div class="spacer_block block-1 mobile_hide" style="height:21px;line-height:21px;font-size:1px;"> </div>
<table border="0" cellpadding="10" cellspacing="0" class="button_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment"><a href="https://www.example.com" style="color:#ffe5de;text-decoration:none;" target="_blank"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://www.example.com"  style="height:42px;width:161px;v-text-anchor:middle;" arcsize="9%" fillcolor="#9e940e">
<v:stroke dashstyle="Solid" weight="1px" color="#9e940e"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffe5de;font-family:Arial, sans-serif;font-size:16px">
<![endif]--><span class="button" style="background-color: #9e940e; border-bottom: 1px solid #9e940e; border-left: 1px solid #9e940e; border-radius: 4px; border-right: 1px solid #9e940e; border-top: 1px solid #9e940e; color: #ffe5de; display: inline-block; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700; mso-border-alt: none; padding-bottom: 5px; padding-top: 5px; padding-left: 20px; padding-right: 20px; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span style="word-break: break-word; line-height: 32px;">@YOUR.BRAND</span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-14" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; background-color: #f9f8f6; padding-left: 25px; padding-right: 25px; padding-top: 5px; width: 680px; margin: 0 auto;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: middle;" width="33.333333333333336%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div class="fullWidth" style="max-width: 210px;"><img alt="Social Image of Product Photo" height="auto" src="images/Easter_SocialImage1.png" style="display: block; height: auto; border: 0; width: 100%;" title="Social Image of Product Photo" width="210"/></div>
</div>
</td>
</tr>
</table>
</td>
<td class="column gap" style="vertical-align: top; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left;">
<table height="5" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 5px; height: 5px;" width="5"></table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: middle;" width="33.333333333333336%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div class="fullWidth" style="max-width: 210px;"><img alt="Social Image Lifestyle" height="auto" src="images/Easter_SocialImage2.png" style="display: block; height: auto; border: 0; width: 100%;" title="Social Image Lifestyle" width="210"/></div>
</div>
</td>
</tr>
</table>
</td>
<td class="column gap" style="vertical-align: top; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left;">
<table height="5" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 5px; height: 5px;" width="5"></table>
</td>
<td class="column column-3" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 5px; vertical-align: middle;" width="33.333333333333336%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div class="fullWidth" style="max-width: 210px;"><img alt="Social Image Ingredients" height="auto" src="images/Easter_SocialImage3.png" style="display: block; height: auto; border: 0; width: 100%;" title="Social Image Ingredients" width="210"/></div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-15" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; background-color: #f9f8f6; padding-left: 25px; padding-right: 25px; padding-bottom: 5px; width: 680px; margin: 0 auto;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;" width="33.333333333333336%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div class="fullWidth" style="max-width: 210px;"><img alt="Social Image of Product Photo" height="auto" src="images/Easter_SocialImage4.png" style="display: block; height: auto; border: 0; width: 100%;" title="Social Image of Product Photo" width="210"/></div>
</div>
</td>
</tr>
</table>
</td>
<td class="column gap" style="vertical-align: top; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left;">
<table height="5" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 5px; height: 5px;" width="5"></table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;" width="33.333333333333336%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div class="fullWidth" style="max-width: 210px;"><img alt="Social Image with Product on Glass" height="auto" src="images/Easter_SocialImage5.png" style="display: block; height: auto; border: 0; width: 100%;" title="Social Image with Product on Glass" width="210"/></div>
</div>
</td>
</tr>
</table>
</td>
<td class="column gap" style="vertical-align: top; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left;">
<table height="5" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 5px; height: 5px;" width="5"></table>
</td>
<td class="column column-3" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;" width="33.333333333333336%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div class="fullWidth" style="max-width: 210px;"><img alt="Social Image of Product Photo on Ingredients Background" height="auto" src="images/Easter_SocialImage6.png" style="display: block; height: auto; border: 0; width: 100%;" title="Social Image of Product Photo on Ingredients Background" width="210"/></div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-16" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f8f6; border-radius: 0; color: #000000; width: 680px; margin: 0 auto;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:25px;padding-right:25px;padding-top:10px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #ffb9a5;"><span style="word-break: break-word;"> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-17" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f8f6; padding-left: 25px; padding-right: 25px; border-radius: 0; color: #000000; width: 680px; margin: 0 auto;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle; border-radius: 0px;" width="58.333333333333336%">
<table border="0" cellpadding="10" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<h2 style="margin: 0; color: #9e940e; direction: ltr; font-family: 'Oswald', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 56px; font-weight: 700; letter-spacing: normal; line-height: 1.2; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 67px;">READY FOR SPRING SALE?</h2>
</td>
</tr>
</table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle; border-radius: 0px;" width="41.666666666666664%">
<table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad">
<div style="color:#232420;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:right;mso-line-height-alt:19px;">
<p style="margin: 0;">Order ahead for a refreshing Easter pick-me-up!</p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="10" cellspacing="0" class="button_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="right" class="alignment"><a href="https://www.example.com" style="color:#ffe5de;text-decoration:none;" target="_blank"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="https://www.example.com"  style="height:42px;width:146px;v-text-anchor:middle;" arcsize="9%" fillcolor="#9e940e">
<v:stroke dashstyle="Solid" weight="1px" color="#9e940e"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffe5de;font-family:Arial, sans-serif;font-size:16px">
<![endif]--><span class="button" style="background-color: #9e940e; border-bottom: 1px solid #9e940e; border-left: 1px solid #9e940e; border-radius: 4px; border-right: 1px solid #9e940e; border-top: 1px solid #9e940e; color: #ffe5de; display: inline-block; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700; mso-border-alt: none; padding-bottom: 5px; padding-top: 5px; padding-left: 20px; padding-right: 20px; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span style="word-break: break-word; line-height: 32px;">GET 25% OFF</span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-18" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f8f6; border-radius: 0; color: #000000; width: 680px; margin: 0 auto;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
<div class="spacer_block block-1" style="height:21px;line-height:21px;font-size:1px;"> </div>
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div class="fullWidth" style="max-width: 680px;"><img alt="Product Image" height="auto" src="images/Easter_ProductImage_Footer.png" style="display: block; height: auto; border: 0; width: 100%;" title="Product Image" width="680"/></div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-19" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #232420; border-radius: 0; color: #000000; width: 680px; margin: 0 auto;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="100%">
<div class="spacer_block block-1" style="height:21px;line-height:21px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-20" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #232420; border-radius: 0; color: #000000; padding-left: 25px; padding-right: 25px; width: 680px; margin: 0 auto;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;" width="50%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="left" class="alignment">
<div style="max-width: 290px;"><img alt="Your Logo" height="auto" src="images/Easter_YourLogo.png" style="display: block; height: auto; border: 0; width: 100%;" title="Your Logo" width="290"/></div>
</div>
</td>
</tr>
</table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;" width="50%">
<table border="0" cellpadding="10" cellspacing="0" class="social_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="right" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;" width="184px">
<tr>
<td style="padding:0 0 0 14px;"><a href="https://www.facebook.com/" target="_blank"><img alt="Facebook" height="auto" src="images/facebook2x.png" style="display: block; height: auto; border: 0;" title="facebook" width="32"/></a></td>
<td style="padding:0 0 0 14px;"><a href="https://www.twitter.com/" target="_blank"><img alt="Twitter" height="auto" src="images/twitter2x.png" style="display: block; height: auto; border: 0;" title="twitter" width="32"/></a></td>
<td style="padding:0 0 0 14px;"><a href="https://www.linkedin.com/" target="_blank"><img alt="Linkedin" height="auto" src="images/linkedin2x.png" style="display: block; height: auto; border: 0;" title="linkedin" width="32"/></a></td>
<td style="padding:0 0 0 14px;"><a href="https://www.instagram.com/" target="_blank"><img alt="Instagram" height="auto" src="images/instagram2x.png" style="display: block; height: auto; border: 0;" title="instagram" width="32"/></a></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-21" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #232420; border-radius: 0; color: #000000; width: 680px; margin: 0 auto;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="divider_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:25px;padding-right:25px;padding-top:10px;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;"><span style="word-break: break-word;"> </span></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="10" cellspacing="0" class="menu_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="alignment" style="text-align:center;font-size:0px;">
<div class="menu-links"><!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style=""><tr style="text-align:center;"><![endif]--><!--[if mso]><td style="padding-top:0px;padding-right:10px;padding-bottom:0px;padding-left:10px"><![endif]--><a href="https://www.example.com" style="mso-hide:false;padding-top:0px;padding-bottom:0px;padding-left:10px;padding-right:10px;display:inline-block;color:#ffb9a5;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;text-decoration:none;letter-spacing:normal;" target="_self">HOME</a><!--[if mso]></td><![endif]--><!--[if mso]><td style="padding-top:0px;padding-right:10px;padding-bottom:0px;padding-left:10px"><![endif]--><a href="https://www.example.com" style="mso-hide:false;padding-top:0px;padding-bottom:0px;padding-left:10px;padding-right:10px;display:inline-block;color:#ffb9a5;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;text-decoration:none;letter-spacing:normal;" target="_self">ABOUT</a><!--[if mso]></td><![endif]--><!--[if mso]><td style="padding-top:0px;padding-right:10px;padding-bottom:0px;padding-left:10px"><![endif]--><a href="https://www.example.com" style="mso-hide:false;padding-top:0px;padding-bottom:0px;padding-left:10px;padding-right:10px;display:inline-block;color:#ffb9a5;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;text-decoration:none;letter-spacing:normal;" target="_self">SHOP</a><!--[if mso]></td><![endif]--><!--[if mso]><td style="padding-top:0px;padding-right:10px;padding-bottom:0px;padding-left:10px"><![endif]--><a href="https://www.example.com" style="mso-hide:false;padding-top:0px;padding-bottom:0px;padding-left:10px;padding-right:10px;display:inline-block;color:#ffb9a5;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;text-decoration:none;letter-spacing:normal;" target="_self">BLOG</a><!--[if mso]></td><![endif]--><!--[if mso]></tr></table><![endif]--></div>
</td>
</tr>
</table>
</td>
</tr>
</table>
<table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad">
<div style="color:#f9f8f6;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:19px;">
<p style="margin: 0;">1234 Spring Lane, Suite 100, Cityville ST 56789<br/>© 2025 Your Brand.</p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad">
<div style="color:#f9f8f6;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:1.2;text-align:center;mso-line-height-alt:17px;">
<p style="margin: 0;"><a href="http://example.com/unsubcribe" rel="noopener" style="text-decoration: underline; color: #f9f8f6;" target="_blank">UNSUBSCRIBE</a> | VIEW IN A BROWSER</p>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-22" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #232420; border-radius: 0; color: #000000; width: 680px; margin: 0 auto;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="100%">
<div class="spacer_block block-1" style="height:21px;line-height:21px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-23" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px; margin: 0 auto;" width="680">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center; line-height: 0;" width="100%">
<tr>
<td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
<!--[if !vml]><!-->
<table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; padding-left: 0px; padding-right: 0px;"><!--<![endif]-->
<tr>
<td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 6px;"><a href="http://designedwithbeefree.com/" style="text-decoration: none;" target="_blank"><img align="center" alt="Beefree Logo" class="icon" height="auto" src="images/Beefree-logo.png" style="display: block; height: auto; margin: 0 auto; border: 0;" width="34"/></a></td>
<td style="font-family: 'Inter', sans-serif; font-size: 15px; font-weight: undefined; color: #1e0e4b; vertical-align: middle; letter-spacing: undefined; text-align: center; line-height: normal;"><a href="http://designedwithbeefree.com/" style="color: #1e0e4b; text-decoration: none;" target="_blank">Designed with Beefree</a></td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table><!-- End -->
</body>
</html>`, category: 'promotion' },
        { name: 'Newsletter', content: `<!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<title></title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]>
<xml><w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word"><w:DontUseAdvancedTypographyReadingMail/></w:WordDocument>
<o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml>
<![endif]-->
<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		sup,
		sub {
			font-size: 75%;
			line-height: 0;
		}

		.menu_block.desktop_hide .menu-links span {
			mso-hide: all;
		}

		@media (max-width:720px) {
			.desktop_hide table.icons-outer {
				display: inline-table !important;
			}

			.desktop_hide table.icons-inner,
			.row-5 .column-2 .block-3.button_block .alignment .button,
			.social_block.desktop_hide .social-table {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.image_block div.fullWidth {
				max-width: 100% !important;
			}

			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}

			.row-2 .column-2 .block-1.menu_block td.pad {
				padding: 15px 10px 10px !important;
			}

			.row-2 .column-2 .block-1.menu_block .menu-links a,
			.row-2 .column-2 .block-1.menu_block .menu-links span {
				font-size: 16px !important;
			}

			.row-3 .column-1 .block-2.image_block td.pad {
				padding: 20px 20px 0 !important;
			}

			.row-3 .column-1 .block-4.heading_block h1 {
				text-align: center !important;
				font-size: 35px !important;
			}

			.row-3 .column-1 .block-4.heading_block td.pad {
				padding: 10px 25px !important;
			}

			.row-3 .column-1 .block-5.paragraph_block td.pad>div,
			.row-5 .column-2 .block-3.button_block .alignment,
			.row-8 .column-2 .block-2.paragraph_block td.pad>div {
				text-align: left !important;
			}

			.row-15 .column-1 .block-1.image_block td.pad,
			.row-3 .column-1 .block-5.paragraph_block td.pad {
				padding: 0 25px !important;
			}

			.row-5 .column-2 .block-1.heading_block h1,
			.row-8 .column-2 .block-1.heading_block h1 {
				font-size: 32px !important;
			}

			.row-11 .column-1 .block-2.image_block td.pad,
			.row-5 .column-2 .block-2.paragraph_block td.pad {
				padding: 0 20px !important;
			}

			.row-7 .column-1 .block-1.spacer_block {
				height: 40px !important;
			}

			.row-5 .column-2 .block-3.button_block td.pad {
				padding: 20px 20px 10px !important;
			}

			.row-5 .column-2 .block-3.button_block span,
			.row-8 .column-2 .block-3.button_block span {
				line-height: 32px !important;
			}

			.row-8 .column-1 .block-1.image_block td.pad {
				padding: 25px 20px 0 !important;
			}

			.row-11 .column-1 .block-2.image_block .alignment div,
			.row-8 .column-1 .block-1.image_block .alignment div {
				margin: 0 auto !important;
			}

			.row-8 .column-2 .block-1.heading_block td.pad {
				padding: 15px 20px 10px !important;
			}

			.row-8 .column-2 .block-2.paragraph_block td.pad {
				padding: 0 20px 10px !important;
			}

			.row-8 .column-2 .block-3.button_block td.pad {
				padding: 10px 20px 35px !important;
			}

			.row-9 .column-1 .block-2.heading_block td.pad {
				padding: 10px 20px !important;
			}

			.row-18 .column-1 .block-2.heading_block h1,
			.row-9 .column-1 .block-2.heading_block h1 {
				font-size: 30px !important;
			}

			.row-13 .column-1 .block-1.image_block td.pad {
				padding: 40px 0 0 25px !important;
			}

			.row-13 .column-1 .block-1.image_block .alignment div,
			.row-14 .column-1 .block-1.image_block .alignment div,
			.row-15 .column-1 .block-1.image_block .alignment div,
			.row-16 .column-1 .block-1.image_block .alignment div {
				margin: 0 auto 0 0 !important;
			}

			.row-12 .column-1 .block-2.heading_block td.pad {
				padding: 20px 10px 0 !important;
			}

			.row-12 .column-1 .block-2.heading_block h1 {
				font-size: 35px !important;
			}

			.row-13 .column-2 .block-1.heading_block td.pad,
			.row-14 .column-2 .block-1.heading_block td.pad,
			.row-15 .column-2 .block-1.heading_block td.pad,
			.row-16 .column-2 .block-1.heading_block td.pad {
				padding: 10px 25px 0 !important;
			}

			.row-13 .column-2 .block-2.paragraph_block td.pad,
			.row-14 .column-2 .block-2.paragraph_block td.pad,
			.row-15 .column-2 .block-2.paragraph_block td.pad,
			.row-16 .column-2 .block-2.paragraph_block td.pad {
				padding: 0 25px 10px !important;
			}

			.row-14 .column-1 .block-1.image_block td.pad {
				padding: 0 0 5px 25px !important;
			}

			.row-16 .column-1 .block-1.image_block td.pad {
				padding: 0 0 0 25px !important;
			}

			.row-19 .column-1 .block-5.social_block td.pad,
			.row-19 .column-2 .block-5.social_block td.pad {
				padding: 10px 10px 30px !important;
			}

			.row-13 .column-2,
			.row-14 .column-2,
			.row-15 .column-2,
			.row-16 .column-2,
			.row-7 .column-1,
			.row-8 .column-2 {
				padding: 0 !important;
			}

			.row-13 .column-1,
			.row-8 .column-1 {
				padding: 5px 0 0 !important;
			}

			.row-14 .column-1,
			.row-15 .column-1,
			.row-16 .column-1 {
				padding: 30px 0 0 !important;
			}
		}
	</style><!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
</head>
<body class="body" style="background-color: #ffffff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f7f7f7; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
<div class="spacer_block block-1" style="height:30px;line-height:30px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f7f7f7; color: #000000; width: 700px; margin: 0 auto;" width="700">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle;" width="41.666666666666664%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:25px;padding-right:20px;width:100%;">
<div align="center" class="alignment">
<div style="max-width: 146px;"><img alt="" height="auto" src="images/logo-red.png" style="display: block; height: auto; border: 0; width: 100%;" title="" width="146"/></div>
</div>
</td>
</tr>
</table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle;" width="58.333333333333336%">
<table border="0" cellpadding="10" cellspacing="0" class="menu_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="alignment" style="text-align:center;font-size:0px;">
<div class="menu-links"><!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style=""><tr style="text-align:center;"><![endif]--><!--[if mso]><td style="padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:10px"><![endif]--><a href="www.example.com" style="mso-hide:false;padding-top:5px;padding-bottom:5px;padding-left:10px;padding-right:10px;display:inline-block;color:#373449;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:15px;text-decoration:none;letter-spacing:normal;" target="_self">HOME</a><!--[if mso]></td><![endif]--><!--[if mso]><td style="padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:10px"><![endif]--><a href="www.example.com" style="mso-hide:false;padding-top:5px;padding-bottom:5px;padding-left:10px;padding-right:10px;display:inline-block;color:#373449;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:15px;text-decoration:none;letter-spacing:normal;" target="_self">NEWS</a><!--[if mso]></td><![endif]--><!--[if mso]><td style="padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:10px"><![endif]--><a href="www.example.com" style="mso-hide:false;padding-top:5px;padding-bottom:5px;padding-left:10px;padding-right:10px;display:inline-block;color:#373449;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:15px;text-decoration:none;letter-spacing:normal;" target="_self">EVENTS</a><!--[if mso]></td><![endif]--><!--[if mso]><td style="padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:10px"><![endif]--><a href="www.example.com" style="mso-hide:false;padding-top:5px;padding-bottom:5px;padding-left:10px;padding-right:10px;display:inline-block;color:#373449;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:15px;text-decoration:none;letter-spacing:normal;" target="_self">LOG IN</a><!--[if mso]></td><![endif]--><!--[if mso]></tr></table><![endif]--></div>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f7f7f7; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
<div class="spacer_block block-1 mobile_hide" style="height:40px;line-height:40px;font-size:1px;"> </div>
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div class="fullWidth" style="max-width: 490px;"><img alt="Hero Image" height="auto" src="images/hero-juneteenth.png" style="display: block; height: auto; border: 0; width: 100%;" title="Hero Image" width="490"/></div>
</div>
</td>
</tr>
</table>
<div class="spacer_block block-3 mobile_hide" style="height:10px;line-height:10px;font-size:1px;"> </div>
<table border="0" cellpadding="10" cellspacing="0" class="heading_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<h1 style="margin: 0; color: #50b154; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 40px; font-weight: 700; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 48px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Company Monthly 
<br/>Newsletter</span></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-left:50px;padding-right:50px;">
<div style="color:#373449;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:18px;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:center;mso-line-height-alt:27px;">
<p data-pm-slice="1 1 []" style="margin: 0;">We are so excited to bring you news and updates about our company, our products and services, and our team. This month, we have some exciting announcements about upcoming events, new products, and more. We hope you enjoy this edition of the newsletter and that it helps you stay up-to-date with everything going on!</p>
</div>
</td>
</tr>
</table>
<div class="spacer_block block-6" style="height:20px;line-height:20px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #212121; border-left: 16px solid #F7F7F7; border-right: 16px solid #F7F7F7; border-radius: 0; border-top: 16px solid #F7F7F7; color: #000000; width: 700px; margin: 0 auto;" width="700">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="100%">
<div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto; background-color: #212121; border-left: 16px solid #F7F7F7; border-right: 16px solid #F7F7F7; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;" width="50%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-right:20px;width:100%;">
<div align="center" class="alignment">
<div style="max-width: 293.92px;"><img alt="Earth Day Image" height="auto" src="images/juneteenth.png" style="display: block; height: auto; border: 0; width: 100%;" title="Earth Day Image" width="293.92"/></div>
</div>
</td>
</tr>
</table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;" width="50%">
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:30px;padding-top:10px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #ed3f41; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 35px; font-weight: 700; letter-spacing: normal; line-height: 1.2; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 42px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Celebrate Freedom Day!</span></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-right:30px;">
<div style="color:#ffffff;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:18px;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;mso-line-height-alt:27px;">
<p data-renderer-start-pos="1" style="margin: 0;">Juneteenth, also known as “Liberation Day,” marks the day enslaved Black Americans in Texas learned of their freedom.<br/>This took place on June 19, 1865, almost two and a half years after their legal emancipation from slavery was announced.<br/>We observe this holiday by educating ourselves on Black History and culture and advocating for the true liberation of Black individuals today and every day.</p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="button_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:20px;text-align:left;">
<div align="left" class="alignment"><a href="www.example.com" style="color:#ffffff;text-decoration:none;" target="_blank"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="www.example.com"  style="height:42px;width:158px;v-text-anchor:middle;" arcsize="72%" fillcolor="#ed3f41">
<v:stroke dashstyle="Solid" weight="0px" color="#765BE9"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffffff;font-family:sans-serif;font-size:16px">
<![endif]--><span class="button" style="background-color: #ed3f41; border-bottom: 0px solid #765BE9; border-left: 0px solid #765BE9; border-radius: 30px; border-right: 0px solid #765BE9; border-top: 0px solid #765BE9; color: #ffffff; display: inline-block; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700; mso-border-alt: none; padding-bottom: 5px; padding-top: 5px; padding-left: 30px; padding-right: 30px; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span style="word-break: break-word; line-height: 32px;">READ MORE</span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #212121; border-left: 16px solid #F7F7F7; border-right: 16px solid #F7F7F7; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="100%">
<div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f7f7f7; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; padding-top: 10px; vertical-align: top;" width="100%">
<div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-8" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffc353; border-left: 16px solid #F7F7F7; border-radius: 0; border-right: 16px solid #F7F7F7; color: #000000; width: 700px; margin: 0 auto;" width="700">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-left: 20px; padding-top: 20px; vertical-align: middle;" width="50%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:10px;padding-right:10px;width:100%;">
<div align="right" class="alignment">
<div style="max-width: 292.02px;"><img alt="Updates Placeholder Image" height="auto" src="images/illustration_2.png" style="display: block; height: auto; border: 0; width: 100%;" title="Updates Placeholder Image" width="292.02"/></div>
</div>
</td>
</tr>
</table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 20px; padding-top: 20px; vertical-align: middle;" width="50%">
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #212121; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 30px; font-weight: 700; letter-spacing: normal; line-height: 1.2; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 36px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Company Updates</span></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:30px;">
<div style="color:#212121;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:18px;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;mso-line-height-alt:27px;">
<p style="margin: 0; margin-bottom: 16px;">We are thrilled to announce the launch of our new product line! Our team has been hard at work developing innovative solutions that meet the evolving needs of our customers.</p>
<p style="margin: 0;">We can't wait for you to try them out and see the difference for yourself. </p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="button_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:30px;padding-top:10px;text-align:left;">
<div align="left" class="alignment"><a href="www.example.com" style="color:#ffffff;text-decoration:none;" target="_blank"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="www.example.com"  style="height:42px;width:158px;v-text-anchor:middle;" arcsize="72%" fillcolor="#212121">
<v:stroke dashstyle="Solid" weight="0px" color="#FEF2DD"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffffff;font-family:sans-serif;font-size:16px">
<![endif]--><span class="button" style="background-color: #212121; border-bottom: 0px solid #FEF2DD; border-left: 0px solid #FEF2DD; border-radius: 30px; border-right: 0px solid #FEF2DD; border-top: 0px solid #FEF2DD; color: #ffffff; display: inline-block; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 700; mso-border-alt: none; padding-bottom: 5px; padding-top: 5px; padding-left: 30px; padding-right: 30px; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span style="word-break: break-word; line-height: 32px;">READ MORE</span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-9" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f7f7f7; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
<div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;"> </div>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:20px;padding-left:10px;padding-right:10px;padding-top:10px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #ed3f41; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 40px; font-weight: 700; letter-spacing: normal; line-height: 1.5; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 60px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Upcoming Events</span></h1>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-10" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f7f7f7; border-left: 8px solid #F7F7F7; border-radius: 0; border-right: 8px solid #F7F7F7; color: #000000; width: 700px; margin: 0 auto;" width="700">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; border-bottom: 8px solid #F7F7F7; border-left: 8px solid #F7F7F7; border-right: 8px solid #F7F7F7; border-top: 8px solid #F7F7F7; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="33.333333333333336%">
<div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;"> </div>
<table border="0" cellpadding="0" cellspacing="0" class="icons_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: left; line-height: 0;" width="100%">
<tr>
<td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; padding-left: 20px; text-align: left;">
<table cellpadding="0" cellspacing="0" class="icons-outer" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-table;">
<tr>
<td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px;"><img align="center" alt="Calendar Icon" class="icon" height="auto" src="images/050-calendar_1.png" style="display: block; height: auto; margin: 0 auto; border: 0;" width="31"/></td>
</tr>
</table>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-top:5px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #212121; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; letter-spacing: normal; line-height: 1.5; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 24px;"><span class="tinyMce-placeholder" style="word-break: break-word;">DATE & TIME</span></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #ed3f41; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 700; letter-spacing: normal; line-height: 1.5; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 30px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Event Name</span></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-right:20px;padding-top:10px;">
<div style="color:#212121;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;mso-line-height-alt:24px;">
<p style="margin: 0;">Don't miss out on this exciting event that promises to be informative, interactive, and enjoyable. </p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="button_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:20px;text-align:left;">
<div align="left" class="alignment"><a href="www.example.com" style="color:#212121;text-decoration:none;" target="_blank"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="www.example.com"  style="height:34px;width:119px;v-text-anchor:middle;" arcsize="82%" fill="false">
<v:stroke dashstyle="Solid" weight="1px" color="#212121"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#212121;font-family:sans-serif;font-size:12px">
<![endif]--><span class="button" style="background-color: transparent; border-bottom: 1px solid #212121; border-left: 1px solid #212121; border-radius: 30px; border-right: 1px solid #212121; border-top: 1px solid #212121; color: #212121; display: inline-block; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 400; mso-border-alt: none; padding-bottom: 5px; padding-top: 5px; padding-left: 30px; padding-right: 30px; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span style="word-break: break-word; line-height: 24px;">JOIN NOW</span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></div>
</td>
</tr>
</table>
<div class="spacer_block block-7" style="height:20px;line-height:20px;font-size:1px;"> </div>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; border-bottom: 8px solid #F7F7F7; border-left: 8px solid #F7F7F7; border-right: 8px solid #F7F7F7; border-top: 8px solid #F7F7F7; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="33.333333333333336%">
<div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;"> </div>
<table border="0" cellpadding="0" cellspacing="0" class="icons_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: left; line-height: 0;" width="100%">
<tr>
<td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; padding-left: 20px; text-align: left;">
<table cellpadding="0" cellspacing="0" class="icons-outer" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-table;">
<tr>
<td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px;"><img align="center" alt="Calendar Icon" class="icon" height="auto" src="images/050-calendar_1.png" style="display: block; height: auto; margin: 0 auto; border: 0;" width="31"/></td>
</tr>
</table>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-top:5px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #212121; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; letter-spacing: normal; line-height: 1.5; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 24px;"><span class="tinyMce-placeholder" style="word-break: break-word;">DATE & TIME</span></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #ed3f41; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 700; letter-spacing: normal; line-height: 1.5; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 30px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Event Name</span></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-right:20px;padding-top:10px;">
<div style="color:#212121;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;mso-line-height-alt:24px;">
<p style="margin: 0;">Don't miss out on this exciting event that promises to be informative, interactive, and enjoyable. </p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="button_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:20px;text-align:left;">
<div align="left" class="alignment"><a href="www.example.com" style="color:#212121;text-decoration:none;" target="_blank"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="www.example.com"  style="height:34px;width:119px;v-text-anchor:middle;" arcsize="82%" fill="false">
<v:stroke dashstyle="Solid" weight="1px" color="#212121"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#212121;font-family:sans-serif;font-size:12px">
<![endif]--><span class="button" style="background-color: transparent; border-bottom: 1px solid #212121; border-left: 1px solid #212121; border-radius: 30px; border-right: 1px solid #212121; border-top: 1px solid #212121; color: #212121; display: inline-block; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 400; mso-border-alt: none; padding-bottom: 5px; padding-top: 5px; padding-left: 30px; padding-right: 30px; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span style="word-break: break-word; line-height: 24px;">JOIN NOW</span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></div>
</td>
</tr>
</table>
<div class="spacer_block block-7" style="height:20px;line-height:20px;font-size:1px;"> </div>
</td>
<td class="column column-3" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #ffffff; border-bottom: 8px solid #F7F7F7; border-left: 8px solid #F7F7F7; border-right: 8px solid #F7F7F7; border-top: 8px solid #F7F7F7; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="33.333333333333336%">
<div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;"> </div>
<table border="0" cellpadding="0" cellspacing="0" class="icons_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: left; line-height: 0;" width="100%">
<tr>
<td class="pad" style="vertical-align: middle; color: #000000; font-family: inherit; font-size: 14px; padding-left: 20px; text-align: left;">
<table cellpadding="0" cellspacing="0" class="icons-outer" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-table;">
<tr>
<td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 5px;"><img align="center" alt="Calendar Icon" class="icon" height="auto" src="images/050-calendar_1.png" style="display: block; height: auto; margin: 0 auto; border: 0;" width="31"/></td>
</tr>
</table>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-top:5px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #212121; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; letter-spacing: normal; line-height: 1.5; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 24px;"><span class="tinyMce-placeholder" style="word-break: break-word;">DATE & TIME</span></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #ed3f41; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 700; letter-spacing: normal; line-height: 1.5; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 30px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Event Name</span></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-right:20px;padding-top:10px;">
<div style="color:#212121;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;mso-line-height-alt:24px;">
<p style="margin: 0;">Don't miss out on this exciting event that promises to be informative, interactive, and enjoyable. </p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="button_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:20px;text-align:left;">
<div align="left" class="alignment"><a href="www.example.com" style="color:#212121;text-decoration:none;" target="_blank"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"  href="www.example.com"  style="height:34px;width:119px;v-text-anchor:middle;" arcsize="82%" fill="false">
<v:stroke dashstyle="Solid" weight="1px" color="#212121"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#212121;font-family:sans-serif;font-size:12px">
<![endif]--><span class="button" style="background-color: transparent; border-bottom: 1px solid #212121; border-left: 1px solid #212121; border-radius: 30px; border-right: 1px solid #212121; border-top: 1px solid #212121; color: #212121; display: inline-block; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 400; mso-border-alt: none; padding-bottom: 5px; padding-top: 5px; padding-left: 30px; padding-right: 30px; text-align: center; width: auto; word-break: keep-all; letter-spacing: normal;"><span style="word-break: break-word; line-height: 24px;">JOIN NOW</span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a></div>
</td>
</tr>
</table>
<div class="spacer_block block-7" style="height:20px;line-height:20px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-11" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto; background-color: #f7f7f7; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
<div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;"> </div>
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div class="fullWidth" style="max-width: 490px;"><img alt="Reminder Illustration" height="auto" src="images/hero-juneteenth-2.png" style="display: block; height: auto; border: 0; width: 100%;" title="Reminder Illustration" width="490"/></div>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-12" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #50b154; border-radius: 0; color: #000000; background-image: url('images/Group_34.png'); background-repeat: no-repeat; width: 700px; margin: 0 auto;" width="700">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
<div class="spacer_block block-1" style="height:30px;line-height:30px;font-size:1px;"> </div>
<table border="0" cellpadding="10" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<h1 style="margin: 0; color: #212121; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 40px; font-weight: 700; letter-spacing: normal; line-height: 1.5; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 60px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Reminders:</span></h1>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-13" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #50b154; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;" width="33.333333333333336%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-top:20px;width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div style="max-width: 117px;"><img alt="Messages Icon" height="auto" src="images/Group_5_4.png" style="display: block; height: auto; border: 0; width: 100%;" title="Messages Icon" width="117"/></div>
</div>
</td>
</tr>
</table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;" width="66.66666666666667%">
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #212121; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 25px; font-weight: 400; letter-spacing: normal; line-height: 1.5; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 38px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Mark Your Calendars 🔔</span></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:30px;">
<div style="color:#ffffff;direction:ltr;font-family:'Nunito', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;mso-line-height-alt:24px;">
<p style="margin: 0;">We have a company-wide volunteer day scheduled for next month and a team-building activity planned for the end of the month. Details and sign-up instructions will be shared soon.</p>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-14" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #50b154; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;" width="33.333333333333336%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:20px;width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div style="max-width: 82px;"><img alt="Phone Icon" height="auto" src="images/Group_6_4.png" style="display: block; height: auto; border: 0; width: 100%;" title="Phone Icon" width="82"/></div>
</div>
</td>
</tr>
</table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;" width="66.66666666666667%">
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #212121; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 25px; font-weight: 400; letter-spacing: normal; line-height: 1.5; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 38px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Latest Developments 🔔</span></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:30px;">
<div style="color:#ffffff;direction:ltr;font-family:'Nunito', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;mso-line-height-alt:24px;">
<p style="margin: 0;">In the past month, we've welcomed several new team members and launched a new project that's already gaining traction in the market. We're excited to share more updates with you soon!</p>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-15" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #50b154; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;" width="33.333333333333336%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:20px;padding-top:20px;width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div style="max-width: 105px;"><img alt="Settings Icon" height="auto" src="images/Group_7_4.png" style="display: block; height: auto; border: 0; width: 100%;" title="Settings Icon" width="105"/></div>
</div>
</td>
</tr>
</table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;" width="66.66666666666667%">
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #212121; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 25px; font-weight: 400; letter-spacing: normal; line-height: 1.5; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 38px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Safety Reminders 🔔</span></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:30px;">
<div style="color:#ffffff;direction:ltr;font-family:'Nunito', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;mso-line-height-alt:24px;">
<p style="margin: 0;">As we continue to navigate the pandemic, please remember to follow all safety guidelines and protocols. This includes wearing masks in shared spaces, practicing social distancing, and staying home if you feel unwell. </p>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-16" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #50b154; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;" width="33.333333333333336%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:20px;padding-top:20px;width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div style="max-width: 93px;"><img alt="Leads Icon" height="auto" src="images/Group_8_4.png" style="display: block; height: auto; border: 0; width: 100%;" title="Leads Icon" width="93"/></div>
</div>
</td>
</tr>
</table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: middle;" width="66.66666666666667%">
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #212121; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 25px; font-weight: 400; letter-spacing: normal; line-height: 1.5; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 38px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Employee Recognition 🔔</span></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:30px;">
<div style="color:#ffffff;direction:ltr;font-family:'Nunito', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;mso-line-height-alt:24px;">
<p style="margin: 0;">We want to recognize and celebrate the outstanding work of our employees. This month, we'd like to give a special shoutout to Jane from the marketing team for her excellent performance on a recent project.</p>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-17" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #50b154; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="100%">
<div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-18" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f7f7f7; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
<div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;"> </div>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:10px;padding-right:10px;padding-top:10px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #ed3f41; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 40px; font-weight: 700; letter-spacing: normal; line-height: 1.2; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 48px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Welcome to the team</span></h1>
</td>
</tr>
</table>
<div class="spacer_block block-3" style="height:20px;line-height:20px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-19" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f7f7f7; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="33.333333333333336%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div style="max-width: 152px;"><img alt="Employee Portrait" height="auto" src="images/Ellipse_1_4.png" style="display: block; height: auto; border: 0; width: 100%;" title="Employee Portrait" width="152"/></div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-right:20px;padding-top:20px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #212121; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; letter-spacing: normal; line-height: 1.5; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 24px;"><span class="tinyMce-placeholder" style="word-break: break-word;">COMPANY POSITION</span></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #ed3f41; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 700; letter-spacing: normal; line-height: 1.5; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 30px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Sarah Richards</span></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:5px;">
<div style="color:#212121;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:15px;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:center;mso-line-height-alt:23px;">
<p style="margin: 0;">Please join us in welcoming our new team member, to our organization! </p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="10" cellspacing="0" class="social_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;" width="126px">
<tr>
<td style="padding:0 5px 0 5px;"><a href="https://www.twitter.com" target="_blank"><img alt="twitter" height="auto" src="images/twitter2x-1.png" style="display: block; height: auto; border: 0;" title="twitter" width="32"/></a></td>
<td style="padding:0 5px 0 5px;"><a href="https://www.linkedin.com" target="_blank"><img alt="linkedin" height="auto" src="images/linkedin2x-1.png" style="display: block; height: auto; border: 0;" title="linkedin" width="32"/></a></td>
<td style="padding:0 5px 0 5px;"><a href="mailto:" target="_blank"><img alt="E-Mail" height="auto" src="images/mail2x.png" style="display: block; height: auto; border: 0;" title="E-Mail" width="32"/></a></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
<td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="33.333333333333336%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div style="max-width: 152px;"><img alt="Employee Portrait" height="auto" src="images/Ellipse_2_4.png" style="display: block; height: auto; border: 0; width: 100%;" title="Employee Portrait" width="152"/></div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-right:20px;padding-top:20px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #212121; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; letter-spacing: normal; line-height: 1.5; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 24px;"><span class="tinyMce-placeholder" style="word-break: break-word;">COMPANY POSITION</span></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #ed3f41; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 700; letter-spacing: normal; line-height: 1.5; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 30px;"><span class="tinyMce-placeholder" style="word-break: break-word;">John Doe</span></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:5px;">
<div style="color:#212121;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:15px;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:center;mso-line-height-alt:23px;">
<p style="margin: 0;">Please join us in welcoming our new team member, to our organization! </p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="10" cellspacing="0" class="social_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;" width="126px">
<tr>
<td style="padding:0 5px 0 5px;"><a href="https://www.twitter.com" target="_blank"><img alt="twitter" height="auto" src="images/twitter2x-1.png" style="display: block; height: auto; border: 0;" title="twitter" width="32"/></a></td>
<td style="padding:0 5px 0 5px;"><a href="https://www.linkedin.com" target="_blank"><img alt="linkedin" height="auto" src="images/linkedin2x-1.png" style="display: block; height: auto; border: 0;" title="linkedin" width="32"/></a></td>
<td style="padding:0 5px 0 5px;"><a href="mailto:" target="_blank"><img alt="E-Mail" height="auto" src="images/mail2x.png" style="display: block; height: auto; border: 0;" title="E-Mail" width="32"/></a></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
<td class="column column-3" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="33.333333333333336%">
<table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
<div align="center" class="alignment">
<div style="max-width: 152px;"><img alt="Employee Portrait" height="auto" src="images/Ellipse_3_4.png" style="display: block; height: auto; border: 0; width: 100%;" title="Employee Portrait" width="152"/></div>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-right:20px;padding-top:20px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #212121; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; letter-spacing: normal; line-height: 1.5; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 24px;"><span class="tinyMce-placeholder" style="word-break: break-word;">COMPANY POSITION</span></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #ed3f41; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 700; letter-spacing: normal; line-height: 1.5; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 30px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Chris Thomas</span></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:5px;">
<div style="color:#212121;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:15px;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:center;mso-line-height-alt:23px;">
<p style="margin: 0;">Please join us in welcoming our new team member, to our organization! </p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="10" cellspacing="0" class="social_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;" width="126px">
<tr>
<td style="padding:0 5px 0 5px;"><a href="https://www.twitter.com" target="_blank"><img alt="twitter" height="auto" src="images/twitter2x-1.png" style="display: block; height: auto; border: 0;" title="twitter" width="32"/></a></td>
<td style="padding:0 5px 0 5px;"><a href="https://www.linkedin.com" target="_blank"><img alt="linkedin" height="auto" src="images/linkedin2x-1.png" style="display: block; height: auto; border: 0;" title="linkedin" width="32"/></a></td>
<td style="padding:0 5px 0 5px;"><a href="mailto:" target="_blank"><img alt="E-Mail" height="auto" src="images/mail2x.png" style="display: block; height: auto; border: 0;" title="E-Mail" width="32"/></a></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-20" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f7f7f7; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top;" width="100%">
<div class="spacer_block block-1" style="height:40px;line-height:40px;font-size:1px;"> </div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-21" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #212121; border-radius: 0; color: #000000; width: 700px; margin: 0 auto;" width="700">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="100%">
<div class="spacer_block block-1" style="height:35px;line-height:35px;font-size:1px;"> </div>
<table border="0" cellpadding="0" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
<h1 style="margin: 0; color: #ffffff; direction: ltr; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; letter-spacing: normal; line-height: 1.5; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 24px;"><a href="http://www.example.com" rel="noopener" style="text-decoration: underline; color: #ffffff;" target="_blank">Company Name</a> | <a href="http://www.example.com" rel="noopener" style="text-decoration: underline; color: #ffffff;" target="_blank">Company Locations</a></h1>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
<div style="color:#ffffff;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:center;mso-line-height-alt:21px;">
<p style="margin: 0;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>Maecenas a massa a nibh pharetra vehicula. Suspendisse.</p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
<div style="color:#ffffff;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:center;mso-line-height-alt:21px;">
<p style="margin: 0;">Questions? Emails us at example@example.com
<br/>Questions relating to privacy and the protection of your personal <br/>information should be sent to example@example.com</p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="social_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
<tr>
<td class="pad" style="padding-bottom:20px;padding-left:10px;padding-right:10px;padding-top:20px;text-align:center;">
<div align="center" class="alignment">
<table border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;" width="208px">
<tr>
<td style="padding:0 10px 0 10px;"><a href="https://www.facebook.com" target="_blank"><img alt="facebook" height="auto" src="images/facebook2x.png" style="display: block; height: auto; border: 0;" title="facebook" width="32"/></a></td>
<td style="padding:0 10px 0 10px;"><a href="https://www.twitter.com" target="_blank"><img alt="twitter" height="auto" src="images/twitter2x.png" style="display: block; height: auto; border: 0;" title="twitter" width="32"/></a></td>
<td style="padding:0 10px 0 10px;"><a href="https://www.linkedin.com" target="_blank"><img alt="linkedin" height="auto" src="images/linkedin2x.png" style="display: block; height: auto; border: 0;" title="linkedin" width="32"/></a></td>
<td style="padding:0 10px 0 10px;"><a href="https://www.instagram.com" target="_blank"><img alt="instagram" height="auto" src="images/instagram2x.png" style="display: block; height: auto; border: 0;" title="instagram" width="32"/></a></td>
</tr>
</table>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
<div style="color:#ffffff;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:center;mso-line-height-alt:24px;">
<p style="margin: 0;"><a href="http://www.example.com" rel="noopener" style="text-decoration: underline; color: #ffffff;" target="_blank">Unsubscribe</a></p>
</div>
</td>
</tr>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
<tr>
<td class="pad" style="padding-bottom:20px;padding-left:20px;padding-right:20px;padding-top:10px;">
<div style="color:#ffffff;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:center;mso-line-height-alt:21px;">
<p style="margin: 0;">Company | 123 Street Name, City Name, Country Name
<br/>Post Code AB12 34CD</p>
</div>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-22" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
<tbody>
<tr>
<td>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 700px; margin: 0 auto;" width="700">
<tbody>
<tr>
<td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;" width="100%">
<table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center; line-height: 0;" width="100%">
<tr>
<td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
<!--[if !vml]><!-->
<table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; padding-left: 0px; padding-right: 0px;"><!--<![endif]-->
<tr>
<td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 6px;"><a href="http://designedwithbeefree.com/" style="text-decoration: none;" target="_blank"><img align="center" alt="Beefree Logo" class="icon" height="auto" src="images/Beefree-logo.png" style="display: block; height: auto; margin: 0 auto; border: 0;" width="34"/></a></td>
<td style="font-family: 'Inter', sans-serif; font-size: 15px; font-weight: undefined; color: #1e0e4b; vertical-align: middle; letter-spacing: undefined; text-align: center; line-height: normal;"><a href="http://designedwithbeefree.com/" style="color: #1e0e4b; text-decoration: none;" target="_blank">Designed with Beefree</a></td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table><!-- End -->
</body>
</html>`, category: 'newsletter' },
      ];
    }

    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching templates' });
  }
};


export const createTemplate = async (req, res) => {
  try {
    const newTemplate = new Template({ ...req.body, userId: req.userId });

    await newTemplate.save();
    res.status(201).json(newTemplate);
  } catch (error) {
    res.status(500).json({ message: 'Error creating template' });
  }
};

export const updateTemplate = async (req, res) => {
  try {
    const updatedTemplate = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTemplate);
  } catch (error) {
    res.status(500).json({ message: 'Error updating template' });
  }
};

export const deleteTemplate = async (req, res) => {
  try {
    await Template.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting template' });
  }
};
