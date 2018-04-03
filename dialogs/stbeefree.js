'use strict';
/*global $,CKEDITOR,FormData,console*/

CKEDITOR.dialog.add( 'stbeefreeDialog', function( editor ) {
	return {
		title: 'Upload BEE free email',
		minWidth: 400,
		minHeight: 50,
		buttons: [CKEDITOR.dialog.okButton],

		contents: [
			{
				id: 'tab-upload',
				label: 'Upload BEE free email',
				elements: [
					// UI elements of the first tab will be defined here.
					{
						type: 'html',
						html: '<div style="text-align: center;">' +
									'<p style="text-align: center; margin-bottom: 0.75rem; white-space: normal;">' +
										'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABHCAYAAABYripYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5QUUyRTUyMkY3RTMxMUU0OERERkI0NkI0RTA3MTdBQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5QUUyRTUyM0Y3RTMxMUU0OERERkI0NkI0RTA3MTdBQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjlBRTJFNTIwRjdFMzExRTQ4RERGQjQ2QjRFMDcxN0FCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlBRTJFNTIxRjdFMzExRTQ4RERGQjQ2QjRFMDcxN0FCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+7ECREQAADZ5JREFUeNrkXGlwW9UVPu/pafUi72scLzE2IcExCQkhwYFAKATKwDQMBDo0HaBMlx9kCk2BKZ3pRiDQTgpdgKEdIEBJBzJJoUlDzJIYsifYIXu8r/Iua3tanqSec20rkvW02JK34cxoZOs+3XvPd8/5zjn33SfO6/XCVInb6008O+h4w+by3iFw3kQFz3Ecfk4zcHu8XsnLWXRKbvdVqepHFRxnmap5cVMBgscLqtp+cR+OVSUM6x0JLC8H/JeLMjRreA6csx6Ei0bHH4ec7o0qnuPH+12nx+vRqxRby1LUT8xKEAw2aV2L2fm2RsHpYu3L7vbaCpNUG3J0wgezAgRR8hSd6rfvVyu4uVwc+6VZOtzetop0zSqtwDfPSBCwF0Vtn1iN3d2k4CbPdN04ELLKF5UZ2jU4jHvGgHBpyLnZ6JA2TcTvJyrEFylq4cUr9KqnphWEXlG6s9Hk3I5+nwDTJMgX1pJk1f2ZWuG/UwoCDlxwqk+sUSm4Qg6mX0gDp9vbUpGhrcIFaZtUEMjv6/rE3Rj3v6OYCdrL8AXmFfsWZWjXjocvogahfsj5W6Ndekap4BQww8Xl9rpTNMJzpXrVr6O5PiKRNRr61j695WVz64DpWYGf+QCQCLhQyFfPVrdZGwYd7iUTtgSL3ZH36vs7a45W7ymRXE54+HdbQavTQYLAg1bgZiwAmEuAxeVhrjGSskOCkq9elqW9HzlsIGpL+Opc06afPv5E+8E9uxgAfjUAmHGAAYeHQtSMUl7C+RhxXkPOywAwBTmWwK35tMNiwFC+ISII+GVVdYf1zc8ae1+wGAe48Q44HRLNwlgkD7Ra3cq97dY3ST/SM8B9/ABQf9Ri3tNulVaPx/ScbjdzDzQ5mGonsUlesCIAodbBgaD02N3sulE5b3RuQHeZe1dh0lqMcI4AS/isw/qPcAAY7B5wySDtHZlMPw4mSt4p83sazxICALLObmxvtkgBAIwK6Un6BrhDvcl574Uh5/fDDUwDNmGnvQ43yFndVPBFJDekjwaxrdHiAiO+hxPSl/RmIGC/wqFu8floMzNSsgkHGXJ5powvovV7Wnky/2jXgPQm/YUWi2stTnjeuFYEBzGIboZ2lkYBWpn0MV58wfweFQyV0zlH/N46AVckvUl/ocHkXBdD8YKsK0ESKpmp5kHJc7J8YUcwxptfjI33cn7fh65JFheLwZH+QrfoXh6ruZKp0oTTEIg0lQLGYOEzZ5sECAQParQcudqDrqOVJeCkMDZNft+PAMTD3Uh/weR0F8WrkutnXOCFDA0PeiUvu3oWBthwEqPgOPZO+nrQ3iMpRSZPph9P4iX9BcoP4srgqEwkvhhddU+UxVssfh9F5akWJnGzg/FF8ghfCPz4qdEz4vfGGP0+YsE12YmNCc3fHIYvQrkWEV5fnPx+2kHw5wsiNOIKiiYadBNOJiKYMRwOucIT46wEwd+8CQh6EQDkIqPESEpPVy0mTNO4TGHXDCnHJ7RF7nFL4LSaMYvzxGYZkgucliH2PlEoaR4u0ToC6yRbgrW3C/ounYZ+fFl7OmF4RwpT4swcSL9iAcxZeiNo9GkR++mvPwuGusMw0HQBXLbRG8/D/WTOr4SC61aDUht6B5++0378APRfPA3mrjbfQihUGkgtKoX8JVU4n4XjAoF75fRAEISDzZfg67e3jq8jXgFzl98Mxau/C7wiGFtbfw+c2/U2DLU3he2HAKhY/2PQF5QErXrr4c+g6fOPwe0Kf6M6e8ESmH/PD2TnETd3kDVMjxtaDu6Duvf+FmTepo5mOP7GlogAsJVG067719/BYR4KAODszm1Q/8mOiACwVPjMCWio3jl5nJCQkQN516yA/GtXoQnnBuf1aOYXdm+/nO1ZTHDq/VdBcoiBlsPxkFFewdwoOT8wc5fsNug4UeP7v7lmLxhOHQkaS5OciuZ/A+RUXAeCWhPQ1nG8ZoQr4sgJvKCE+Xc/xEzNtz7IC4R466HqgGu7ag9BbuVySJlbCg2f7mLkFTCoRguVD/4MkucU+z47s+NN6D597HJR1tkynHkODUDT/t3yJo/zoXmRiIN9cPivv0GL9PjIm3iM5hA3SyhZfVcAAMOryUHprffI+C9A54mv2Op3nz4e1Fa29r4AAEhSi64I4hi2rVd3hLmav2hTM4Z9fgSA0c/UaBkByvGKAE6KCQQy3fwlK0O1okmvCvp0oPEcGJFgaUXGEl/2wmsDM0X0f2J8f9HPnTcSTc4E9Z23eGUQ6XVhxLEb+33/U7RIyM73WdPR154D0a89ojuMPVakSUljnYaSxOw5wZUfukCoQRuR4cklJNEGZkNbEFialHTm62wFB3qDvm9srSdfZO5ICtL3bQOBK128ai0olMM765c++ZCRtR1dRot9RwXCWJLxusPf25Rvx9qA52XZv+XLvSH7SsopgIX3/QjnoGWRQLKLwbnGpTPsFSpUF990J8xdcYsvUvSeqx22DqVq4sRoNw2yzE6VqJdtN7Y1BDO3PhWjR54sOLRKpq5WZr5upwMErQ4Ss/Ih88pFLGKQJVISdHbnW0F8QJJSWIpRKhfM3e3gItLF6ylS0Oc5i5b7VttiaIfz/3lnZD5pkJhbEFt0oDBFhCaX+rYf+SLo84yyq5GZSxgHBIYqLxKaAIse+EnojQ4E5vxH7/pWMDh7NcDCex8FVUJS6C245ovwzfbXfXlF6a3fC5k8RQ1C+7H9bPLFN97h4wdSjlZrrD8yIkWyZFnkijUsTAZywkfsvQAzTH+Gp2jSc/ZraD6wh/n6MMGp2TWXU+zh1Ll228ssRCblzg3o29LdAW1HPscwfdhXT+RULIOsq64ZX9pMZnT09c3y4QTRTMjOY+90nVwGR+G0qOp2X7w+8c+XWJ4/VshHicF5hQLN2oJhrBv875ITiBX3P8Zi/6ntr8nOZzQ0MuJD9xqbk1AitnjDxgCwYy6lSSlzZ2vIdsoAi6puCwBtESZGte+8wlYpwOwRQFOIVJoAWrDuEV8xVH7nA3ARM9GxlSslSfSSk9TicrgaSTYcAFGDQCZH2Ve4kpeIad6auzEHWBrURr675OEnoemLj9GtDkQsnSlxKrtjPUvRR4VCZiJaDQFBYTWckAsV3nAbFK68lbnmhKpIC5bKR1/9g0+5BeseBm1aJhi+OQoDDedAxOyLVlGJyiVm5bHVIp+Lpmojc+05e5IRl62vm/EKmbs6MZmZLiVStILh9hCMrY3Qd74OTJhaOzByubDWoJBKc0ybNx/yKq8HpS4xtlKaJkUFC/laanFZVGjOZpHPGDHJyUU0vy3Cjx5U+LYK6S8kqxTNgw53+UQ7oTIjTyfPBR1Wid2ETVMHHnqjDdY+v1votP2ergk+GOf20N1vie1KZ2sVIceIRUh/ATs/HAsIFNZTUcmbcoNP9P/lzCCdNIXKdA0UJwWGKRwTdjSb2ekWOlazIFUNZfrA3J5u2rx1cYhtxxcmKmFxhkZ2jFiE9BfmJas+pHM8sXR0esCBnQkwP0UFJ/vsTEHfaiJI/2uzwA/LUphVfNphhTK8riBBCeV6NdT22xmQ+/Bz6kOv4mF/l40p7n8O5GC3yNrzEwQ40iOyG7vxENKfR4T34MANsXbmHLlfRvcNe9HUWyxSABDSSCZ4zuiEzhET9r9XS81j70N0i4GmPvZudKctNlcgvUl/Ht1Nuj5b+1S8iObmPB2sn5cMC9Pkb3Y/Nj8FrsvSsltuF4fkN01vRNe6JT8BMjXyPEDfp/ZQXBStkN6kP+ulNFn1Qbne9W6kw1vRyDfoGkanG7pt8nsQtLrkCl24iuYQJr2jycxW3RSifW+7lblcLC5Rrle9S3oHbK/dnJ/wyJwE4fNYQag3OaGu38FYXU52NVugB9uKkChxPNlrqK0kWcUIVU6IF6i9AtvVEzhuT3qSvkF7jBQv7ypMuv3KFNVbkx2bieRIqnJ0sge6KAosyxx+yclCjCSj7epxnnsg/UhP//xI9oB3o9l1T02XbSuaa2G0nVOsV+GE6DSJW6bPRCXPEB818aSRE2109G6U7+hw19iF9XcJii7KMfuf/t8PWwQq+ZaqXN3GkiRl0F2ZkKfcMURpa/sdPz/eZ38G/9bBLBVMtGzXZmieq0xX/wn/FmUTvkgPfVhdnvyDPeLmC0bnQ7MNgPIU1bYVWdqnE5R8R9isN9onX5DVl9UYxK0GmzTjK6scnXCoKke7EZOro1Gl/uN8EIzD2L7+q27xRbKQmaY8rfjKbO0vMP1+H8ZxYGFCT8MRR2B6vOlkv2MTcccM8Htxcbp6C0aVLcQB4y4CY3kuEpOVORjuXkDreHC6AMBVf29FtvaXGH3aJ1wJx+MJWeKJAwbxz5gELZ0q5bO0wrFVOdrHyf9j7SueD4xzWI0+dKhb3GyVPHmT5vcC34k5/9OY9GwDiM+Bt7g/NY+VYALyxVMn+xxPYtKkid8OEGdfnKF+Cf3+eSXPWeM550n7/QTM9IqIL+qHnPfF2lepXvVv8vtkZXx/MmDSQRgVrBZvqDHYtvaIkR/SDPZ7xQmsLzbm6oQvJ3OOU/KbKvQIM+1eHesVf2Vyekoi7/vxjUsztb+nYocOvE72/Lip/HUdet6IHrehp03oYQt61oCO2lNFRxuetN9H211st4cDaarm9X8BBgDXp1T+t0+F6gAAAABJRU5ErkJggg==" />' +
										'<br>Upload the .zip file you received from BEE free.' + 
									'</p>' +
									'<p style="text-align: center;">' +
										'<form onsubmit="return false;" name="beefreeupload" style="text-align: center;">' +
											'<input id="beefreeupload" type="file" name="file" accept="application/zip" style="width: 300px; height: auto; background: #DDD;">' +
										'</form>' +
									'</p>' +
									'<p style="text-align: center; color: red; font-weight: bold; margin: 0.5rem;" id="beeuploadmessage">&nbsp;</p>' +
									'<p style="white-space: normal;">Please remember that emails should comply with the CAN-SPAM act. You should list a physical address and provide an unsubscribe link in the email. To create an unsubscribe link, turn any word(s) in your email into a link, select protocol "<other>," and make the URL [unsubscribe] (with brackets).</p>' +
								'</div>' +
								''
					}
				]
			}
		],

		onOk: function() {
			var formdata = new FormData();
			formdata.append('upfile', $('#beefreeupload')[0].files[0]);
			
			$.ajax({
				type: 'POST',
				url: editor.plugins.stbeefree.path + 'plugin_endpoint.php',
				data: formdata,
				cache: false,
				processData: false,
				contentType: false,
				success: function(data) {

					if (data[0] === 'E') {
						$('#beeuploadmessage').html(data);
						CKEDITOR.instances.html.execCommand( 'stbeefree' );
						return false;
					} else {
						var head = /<head.*?>([\s\S]*)<\/head>/;
						var body = /<body.*?>([\s\S]*)<\/body>/;
						var bodyStyles = /<body.*?style="(.*?)">/;
						var bodyClasses = /<body.*?class="(.*?)".*?>/;

						if (!data.match(head) || !data.match(body)) { 
							$('#beeuploadmessage').html('malformed HTML; cannot locate head or body contents');
							CKEDITOR.instances.html.execCommand( 'stbeefree' );
							return false;
						} 

						$(CKEDITOR.instances.html.document.$).find('head').html(data.match(head)[1]);
						$(CKEDITOR.instances.html.document.$).find('body').html(data.match(body)[1]);
						if (!!data.match(bodyStyles)) $(CKEDITOR.instances.html.document.$).find('body').attr('style', data.match(bodyStyles)[1]);
						if (!!data.match(bodyClasses)) $(CKEDITOR.instances.html.document.$).find('body').addClass(data.match(bodyClasses)[1]);
						$('#beeuploadmessage').html('');
					}

					$('form[name="beefreeupload"]')[0].reset();
				}
			});
		}
	};
});


CKEDITOR.dialog.add( 'stbeefreeDialog_extra', function( editor ) {
	return {
		title: 'Please Wait...',
		minWidth: 400,
		minHeight: 200,
		buttons: [],

		contents: [
			{
				id: 'tab-wait',
				label: 'Please Wait...',
				elements: [
					// UI elements of the first tab will be defined here.
					{
						type: 'html',
						html: '<div style="text-align: center;"><p style="text-align: center;">Your feed data will be ready in a moment.</p><br><img src="' + CKEDITOR.plugins.getPath('strssstory') + 'images/loader.gif" style="width: 100px;" /></div><div style="text-align: center; border-top: 1px dotted #DDD;"><a href="https://www.yahoo.com/?ilc=401" target="_blank"> <img src="https://poweredby.yahoo.com/purple.png" width="134" height="29"> </a></div>'
					}
				]
			}
		]
	};
});