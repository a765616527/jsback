const jsname = '快手极速版'
const $ = Env(jsname);
const notify = $.isNode() ? require('./sendNotify') : '';      // 这里是 node（青龙属于node环境）通知相关的
const {default: Request} = require('got/dist/source/core');
const {request} = require('http');
const querystring = require('querystring');
const {get} = require('request');
const internal = require('stream');
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const debug = 0; //0为关闭调试，1为打开调试,默认为0

/*
 * 加密工具已经升级了一个版本，目前为 jsjiami.com.v6 ，更新了加密算法，缩减了体积;
 * 另外 jsjiami.com.v6 已经强制加入校验，注释可以去掉，但是 jsjiami.com.v6 不能去掉，其他都没有任何绑定。
 * 誓死不会加入任何后门，JsJiami.com 加密的使命就是为了保护你们的Javascript 。
 */
var _0xod6='jsjiami.com.v6',_0xod6_=['_0xod6'],_0x5261=[_0xod6,'wol3w7p9wrQ=','wotzOA==','6LWJ5YyjYMOZ','wrMswpYZwpw=','wr99bQ==','wp7mjYHnjJ/niormgL/vv6XpuLDpg7nkuobvvLnkuKLltLjlr53morbkuYvpgbTovYDvvZs=','6LeB5Y+rfzA=','wqrDjz0=','fuaOiOeOsOeLkuaDmO++n+m6o+mAoeS5gO+9j+S4l+W3q+WtuuahteS5vOmAs+i/nu++k00=','wqMHwp4QwpI=','KDUdMcKy','w7fDu8KkHcOX','wqEYwqo=','6La35Y6mw6xW','BDrDisOhw5Inw64y','wofmjpLnjYLni4rmg6XvvZzmn7LnnoDvvK7orZfnmZPlvJ5becKN5py455yP','6LeV5Yykw7PCpw==','wqQZwqnCiHA=','Xm1S','MuaMhOePsOeJj+aCqO+9sOadj+efpu+9o+iuveeYieW9inDDuT/mnLXnn5xG','w68oRcK9','wrYtwpU=','w6VR44O0','wr1iw5tt','44Gv772X5pyj5aKz5Ye05Yyp6YaWwoLCjzzDjcKMw71gw7rDqApEAw==','aMKbwonDuGY=','wqrDgcOHclA=','wp8ew6cI','w7QPbsKBew==','a8KwwoHDuFM=','SCtqF8K7w6YdQcKtLsOI','AxMoCQ==','dMKfwpvDqcOL','BhzCkyDDriXDnBULdEbCgMObRMKN','GyHDvMOuw5E=','FsOUIMOgwr4=','w4kFwqg6w5g=','w48zUl9Y','woYCwqrDplla','w5jDrcKhMMOt','w5EjVW9I','woIGwpoWwrE=','BsKnDsKWw40P','wqgZwrs=','w6HCnAxSw5LDnMOZwonDmgrDvA==','wqsHw6Zn','SitOC8K9w6A=','CsK6Ng==','VhvCssKgwrvCh8OXw7PCgQ==','w60iFQ==','w6HCnAxSw5LDlcOUwoLDmQ==','wo3DqcOcV0Q=','w7HDkghTGQ==','wp8Uw6Ee','w6AUc2p5SA==','wqvClTY=','wpjCoMK5w7RXwokzwoM7','I8Oxw6M=','VhvCssKgwrvCmcONw6TCmg==','woMPwr7ChnI=','w7p3wqo3woo=','OHDCvcO/','w5DDmsOjwqDCrg==','w5oHwq4lw5w=','EzbDusOvw48=','VcOMw4E=','w6TClOOBuQ==','AcK1LcKc','44O/776u5p2D5aCR5Yao5Y2w6YWew7xLw6dadWDDu2fCo8OcF1Q=','wpg7wopWw5HDkyo=','OsKaa8OqNw==','w7szwqge','DTbDncOuw50yw6I=','wobDvMOISUo=','wq0Kw6U=','LsKSwr/CpsKE','KsOww7I=','wrHCqcObYsKSw78Rw47CssKowr7ChsKFCWpxwrocEjvDoWfDgMOMdMO1w7Fkw7MqwqfDpcKFw48RwrliNGR0WMKnwr3Dhl3CgUPDqOiFl+ackeaLjOigrQrDmhbljrPkuovmlLrploLDiD1KwpbCrMKhw7/vvrA=','GhvDocOhw5s=','w4/DojNTBA==','w5jDjw9sCsKkw7Y=','w7vDiMO+wobCqw==','wqgVwrcZwok=','w68mwrPDkm3Cih/DvcOmw5U6w57ClyDDrMObMw==','GyYJBMKz','w7oUwoLDo2k=','fMKtwqDDrm4=','MMK3wqpZwqTCn8KhRD/DksKAw6xOw6w=','FMKUOU1Nw4RlGsKRZcKUwp/Ct8KRTMOVVyZgwrRGeCxCwqjDkMKlw78aaBrCimJTwptqw7sKMkF5dypY','eG3DsA==','wrHorJ3lrbzmjo/njJ/nl7Hor6XDiQ==','MsOnw6ZT','woJ+w7rCuznDmkfCusK0woZiwqzDjHvCosKDeigXwr/CgeWEvuaLkeWKisKR','dcK+wr7Do8OrVQ==','wprkuYjotb3ljaBJw6TDrsOnU3Elw44ewpvDmcKiE1fDnkrDpjN/Tw==','AQbClQ==','w4dKw7DDkDXDhcKVW8O1wq8t6I+q5YyS6LSj5Y+E5LyR5oGSW8OswpbCtk3CvcKdwprDoMKLVA==','wonDkR0yXsOdw6PCrw==','LMKvesOJP8KfQcKj','T8K1wrXDoHU=','GMK9NMKRw40YBHQbIx96','w5LDjcOKwoXCqQ==','w48uEcOnAQ==','U0TDuUTCmA==','Vhkuw7HDmg==','w7MyUQ==','K8KuwqvCgW8=','44O75Lqs6LeT5Y2W6I2o5Y2x5LyQ5oOn5aaW6LW677y8','wqvCiTJbw5nDrnLClMKt','w4MocG18','wpHDgAjDo1MR','wrptw5JtwoA=','w4RHwpE3wpc=','w6M0wrwaw7/CkVo=','wp8QwpbDulg=','CQDClg==','esOyw5QjTg==','IsOnw5FqYA==','w7PDm8OXwp3Cnw==','PhjChQ/Dmg==','NMKtwpVe','GiRtwrE=','asKTwoE=','cC8pw7rDpg==','TcKrwpfDoXM=','QDdvD8Kww6A=','LcOvw7sdRVMowrVGDcKhw60rw4dew4gtwqgEwoxNwplJCm1yDsKYDFDCij7DuFZpw5MdLcO7wr9pCMK+w6oyf8K0w6VLE1nCncOAw5zDshDDtRBXw7zCn8KrIcKWZ8ONCEoidHUxOlLCg8KIw5pxwonDiMO4wrItwoIYw7HDs8KWXjo8wqvDlyoxwprDo15GwpV+wos/bcOQwqYvQMOxw6gJdsO2w4NuPQpJwprDvwNbw5t5wrXDtcOnw6fCvVIGD8O6w7MPBQg0WsO4wpElw4QmUMKmwrjCoQDChMOYw57CsEkFw5bCnsKgw7HDgMO+DMKNaiQDN0LCt8O2w5TCgW/ChMO2QMKoG8OqCsKzw6vDnMOlwpbCi8Ohw6LCpX0RAMKcAzEBPgPDscKtV8Ovw5tFwrXCo8KywqcRM8KTccOpwrclKsKawpDDkQbDu3Rxw6HDjcOgKh7DvsKIc8KIw4cOAcKEw7LDrEFDwpxSSE5IMcOOSMKjwqBgTlw5I18RDxN5QsKLw6rDthJuw7fDv8OswrfDlMOIdsK+WiTChHXCsEs8wrHCt8KsZU8JUcOlImYhw5xKIsKcwrfCtMOwwohUwp5Ow5hKw5zCl8Kow7INw4J0w77CgH3CpcO8U8OVacKfehbChSzCjDrDrSdIw7hewrDDhcKMw5bChsOdPcK+QGXDncObwrpEwprDuAzDnMKsCcKWTSUjIsOnw4UoQMOQwpDChMKVw4LCnQxuw4YEwp0Iw5w1BGctwocewo/Dg8O1PjZAEMKOwqzDpB/CmWEIwobCtMKUQ3PCmgLCjcKFCDV9OMOXdcOCWkozwoYmFMKxw5XCjMOuFcO0wptPIcKYwrzDozvCrcOkCcOSTMO7ZsO0wro6GcOcb8OOPsKZD8Kjw5A7GyQhccK8w63CsMOLwrPDsH7DkUjDq8K2PlPCssK9IXcGCcOlw4jDscKGbsKOwopJwp/Dom/CtXbCvMO3dDB/YTzDucOHw6HCu8OxCh9qwrzDtCbCr8KgH8KWwp9iwozClDLCkcOEJ1DDvg3DkC3DsEkFF346w43Cky5Jw4kjw6nChsOewoLCgcOrwpbCu2rCtMOWwq7CicKZSWrDiMO7w58Zwp1Ewp1+D8Oiwq3CksOqwpzCozTCrMO8YQvDoDZuVBPDkcK2w6PDshbDmMO+w5nCpcOMacODw7bDjMOqacKiwqcQXcOMwro5w7xxO8KfNCHDvCUxwqMMw7lhKBfDp8KWwqfChUxAw7nClsOZCUMiwr9EOsKmJ8OZFcOlDE/DuTwIwqvDlXnCp15Swq0Qwp8Iw5PCqjnDrGZHfHjDkmbCi8OUwrjDhsK3w47DlQvCj1VaRcOvw59Ewp50w5zCrQh/','w6wqwqPDrw==','woDCg8KVPcOHw78bw4HCtMK1w6fDmsOKXxojw6NEEmDCvTbCjsKUcsOowqcswq9+w6nCsMOXwocCw6UvYAY6EcKn','wqLDocOGT0o=','wqpxwqcDw7/Cm0xZw5Ynw4/DhAAcwr5NwoQ=','VcOubQME','BkjCscKgwobCj8OUw7TCgnLCqsONHsO9w7/DjnVMLAwkZi0=','C8K9JMKQ','Kn8vw43Du8Oiwo3Dg8KUw7kFwow=','w7ojw6jDkA==','wpzDuzE9aQ==','cMKtwqHDlMOZ','MGbCncOWwro=','w4nDjMOeA0E=','JEbDhA==','5620w6Bywp0=','LcK2woJTwr8=','HTXku7Lot7XljK7CjsOaw7jCgnzCvemWu+iuhO++n+itrOeineivoeOBtQ==','w4R6wqo0','wqPCiANOw64=','wqDDsMObX1Y=','w7Ilw6s=','w6YiwqrDow==','IsOa5aeU6LauIsK55Yys5ZqIL8Kh','w68OU2RxQcOx','wqUKw6xq','BcKowqDCiWI=','LsKzLMKWw6g=','wpsTwqDCpW0=','wr7CswZsw7o=','wq3DnMObdXQ=','U8O6VigR','VcK1wrTDp8O+','w7hnC0PDoQ==','w54LLsKGOw==','w7shJMKKHA==','DjY/DsK7','AT0NL8KN','wo1VD1JS','wqgPw7QuwrA=','wqkRw7Z/SsO9WSXCpMOOw5hJCMK9wqvCpcO+N8Kcw6XDgsKsQsKpL8KDwqAjNHk2dsORCQ3DncK5NHDDocKbwqbCrS/DoQTDqCbDtMOWwp7DhcKrCQDDkkF4BHzCvMKRA2sjdSXCr3HCi8K5wrfDm8KF','w64dVHUxDcOsw5wuUMO7w7PDnw==','w6DDu8O1CUfCgA==','ejolw7nCv8Onw5zDvsKnw48=','w4TCm0M=','emfDtUnCvMOMAgYJCMOpOFQfwovCgcKZw41n','w5Fhw7QpwoM=','D8Kvwodfw6rCn8KjRR7DicKbw6EAw6rDisKBNmAvYkjCp8KFAA==','acKfwpE=','DxAYBcK7','wrMYwqt1w6c=','wrHDozPDg3A=','OEjDkcOsw6k=','w418wpMEwpc=','wrHDtMOcSVLCiw==','WwnCjMK3wrw=','wpPDr8Kfw47Csw==','dkfDnUnCvA==','w64/w7/DkQ==','w63DvcO5CUDChMOmZA==','C8K1NMKY','wq8xwpcOwqAnwqwE','wrQrwpEXwoonwrUA','w5PDhRw=','6LWg5Y2owrUA','UMONw4IsRg==','SnPDsg==','DRA4AA==','M8Osw7BST3cewoE=','woDDnQoRX8OJw7zCuQ==','wq7ot7Xmi6Tkv57poqg=','worDlR0b','CiJ9wrkBwrI4w5HCjA==','wo7Dp8KBw4A=','wpNzK3F2KsO6w77DtQ==','w7/DiMKUOsOE','w6UIWg==','XcOwYBUI','44Cs5LmC6Le+5Yyk6I2u5Yy75L2U5oO45aeY6LSw77+U','XMORw5QmTCTCi8Ouw48=','AQbClQzDrz8=','w63DiMOLwqPChg==','fcO7w649Ug==','wr8YwpMkwqU=','woUOw7BqUg==','fTAnw4zDoMO0','6LSb5Y6fw7jDsw==','wprCvcK3w6JN','OcO7wos=','BxgvCsKwZwha','w5Tmjrfnjo3nirPmgJzvvLfnlrvorbDkuaXvvLDnr5PlvILlrJvliYvlk50=','6Ler5Y6Aw63DjQ==','w5MMP8OyEQ==','ZsK/w44=','w5rDi8OEwoHCq8OCBUM=','U+aMqueNleeIveaAgu++g+eWgOiuoeS4uO++jeesvOW+uuWsluWKquWRl8K6','a8KNwqnDqMOy','w7bDtMKENcOn','w5s1wrkhw5Y=','wpvDnMKWw6XCig==','PTwuJMK8','bcKpwqXDoQ==','w4kqV8KBUw==','wrQIw7BOdw==','w7Ahwrwaw7fCkV5Fw5A9wo/Cg18wwqJXwoIEFTXCj8O+woh+ZMKpQ8OZBVo=','byDDoFXCpMOFSB8dHsOBO0wVwp/Dg8Kuw5t6aCtLWMKKecKiPjVXJwXCscOsD8OMNwY=','ccKvwqTDtMOsB14Jw4zDssOJDS3CsCnCgFLChHE6VsOeW0LConTCq8OTw7sYdEjDqMKrMyo7KnJIJcOAw5fDhMKKaMOxem1Vwp1hGMKoewVfLyMtfzpeT8Kiw5JdFw==','w5zDlsOTwprCtsKZRwlaLcOWJsKlIsOIUBA+wr5+w7PDsXxKPyU=','wo4BwpTDpVRcwp7CiSnCu8KVIMKow4/Cvig=','HVHDjMONw64=','EMOoGsO2w4HCklbDrl88wpFAwqQIw45eTA==','w6oUXitwA8Ojw4wpVcOpw6/DlRrDlBjDqBw=','wp5sw4xhwpQnKS3CpcOwwrd/w4bDvMKrw4ktwr5lVmYoCsODGi8PKTXDs8KAwo3CphbCrD/Ci8Oyw6vCrj/Dgm/DgMKlw6UiwojCmcKjw6zDgcKMw61OJQfDqDvCn8K3XTTCmsO4EcOMw7rCtBZ/w41Rw4VLw67CihLCmzchIjHDqcOAL8ORw6MUU8O3w6VpwojCt1pzw6wPw7UBR1NgwqvDtMKIwoXDhgvCqsKrdx3DkVsHw5TCk8OYISPDg8Oew4lTw4fCucOcw5NOasOzZMOrwrPDhsOYwqPCncK5TcOcAsO3wobCuMKmwqvCq3UgOsO9JcO0wpoTbCA2w55gFsOpcX3DhXTDoQbDjzLCt1vDm0RYN2HDmcOyw7hsdMK3w5J/EQtqw7/DjsOYwp7Dr8O1Q8K1RsK9YMOyccOCwqHCih/CqsOUTMKEWATCuDjCh8OdwrszwrHCplwyw44Yw73CrcO9XcOQw63DonHDgMOCwq7DgsOvw6hAwq/DtkQmwowewrptw5NVC1AaVX7CgkYkw7HCucOpX8KSw6t2JRzDrA==','w7nDvMK3AUA=','SD1lFMO0w6QeR8KwIg==','Ch4jCsK3Yw==','wqI6w5oJwr8=','wrPDvsOcSA==','w6LCqhJHw4I=','wrArwp85wqo=','wo3DhBTDt0I=','w7DDt8Oywo3Cig==','w4bDh8OUwp/CqcOX','wqINwqHCumA=','EGHCusOSwrY=','BMK5wpPCpMKS','wr3Ciyxdw58=','dzAyw4zDs8Olw5g=','HRzCgSE=','AsOKw4BHRA==','UMO/cBE=','w78qwrPDrmDClRvDsMOaw48+w6XChDU=','w5kQCMOCEw==','HMK6bsObAA==','FcK/wpLCs8Kq','wrsSw4lBeg==','LsKvwqg=','6LaS5Y2VwofDig==','w7ckw6jDnAU=','HUjCgw==','w5Xmjpznj5PniaTmgbXvv7bmrq3lubQ=','ZMKTwojDjk0=','fcO2w7MucQ==','cGPDo10=','woTCusKnw69Rwo8qwocbw79qQAzCrw==','woRuDEVg','eUjDrWzClQ==','w6UJwr3DlkE=','w5jDjcOA','6LeI5Y2DSVo=','cMK1wrTDocOn','w5PDs8KI','MuaMhOePsOeJj+aCqO+9sOm6tOmAjOS7qe+9guS7iOW3uuWukOaikeS5oumDiui8kO+9hQ==','6LSF5Y6vIEQ=','wr5qw5c=','KsKxwoVdwqnCn8KgRA==','wpPmjKvnj7DnioLmgqrvvqvpu47pg6jkuYzvv6jkupLltI/lrILmo7fkuqjpgoHovJTvv596','wrMpw4YswpQ=','UBxsM8KW','woN9K3E=','worDjBLDrEMLw7nDmQfDpg8FwpzDjw==','w5fDjMKB','6LWk5Yy3w6/DhA==','IUfDh8O6w7Q=','JkDDgMO0w6JjwrHCkg==','KuaNguePg+eIsOaDrO++qOeUgeitguS4lO+9nOeuueW+seWtoOWIgOWTiQ==','woICw7YIwos=','wp/CiiA=','JmzCrcO8wpbDkcKtGA==','a+aOo+eMh+eLguaDru+/ueeVmOivpeS4i++8n+etkuW/kuWtr+WKuOWRvk0=','KcKwwpzClFs=','w5/DgsKSPg==','ecKTwpHDo2fDq8OSH0bDtRRLw4LDvQ==','VMK5wpfDjcOc','w59AMGzDng==','w6QswqA=','6LeN5Y6bwrJN','SjZkAcKh','wpIlPQ==','wqMewq7ChmbCmcOFAw==','w4Lmjo3njobniaPmgJ3vvJfnl4HorrnpgKHov77ku7rvv4rljLHku43mrbXlu63mjrDnjKnkuYI=','6Leo5YyMYBQ=','Az3DjcOvw4Q=','w59+wqU=','NsKpSsOWI8KXQsKh','MuaMhOePsOeJj+aCqO+9sOeVluiviumBtei+jeS7tO+8k+WPnuS5jOasjOW7qOaMh+ePvOS7mBI=','AgEfEcKS','w5DDg8OTwos=','w4PDi8OTwoLCocORCVFqKsOUfMK9fw==','G8O9FA==','6Le15Y+0wpYo','IWvCqsOywoA=','TUnCqQ==','wq7mjIPnjaPniLHmgLTvv6fpuprljIfvvYDljaTnlLjor73vvbA=','KcOIw5JGXQ==','wrkPwr7Cng==','w5suwoPDqFc=','6Lac5Y6Ve8K3','w51hwr05wog=','w61XwpY=','MsK0woTCisKyw7nDk8K6','w6LorJTlr6Hkur7mjrPnjbnnlqDor7PvvobljKrnlrzorZc=','Al7DqMO1w44=','w78gwqDDiEE=','wpTDiwLDoV8=','wpQvwoI=','GcO7EMOtwoPDk1/Drg==','w5XmjpPnjbfniLDmgIXvv73puqvljbDvvoHljZTnlazorZjvv7g=','wp/CvMK0','6LWu5Y+yw67Ctw==','emvDtFfCvsOMQQg=','wqLmjo7njY7nioTmgrHvvr3mnaHnnIbvvYnorqnnmKblv73DnkxS5p2t55ys','6Lau5Y67Q8Oy','woYfwoDDrEU=','ZMO4wr0=','WBrDlB/CgcKCBkk=','aeaNjueOtOeLhuaBse+/o+adsuefgu++oOiur+ebkuW/t8OLw7wh5pyN552hEQ==','BcKOwrdGwqg=','PcK+wobCosKW','dWHDtn/Cmg==','wpHDigHDgVUL','DT1lwrEZ','OsKywpXCpMK9w7vDlg==','wrPDpMOcVA==','w7ltwp4VwrM=','wonDpMKiw6rCug==','bcKYwrLDgGY=','NMKvTsO4P8KE','bMO2w6wwcw==','w5k7w4HDiz4=','JMOWMsO8wqU=','N8Kuwo3CksK+w7vDkcKww4BURg==','wqTCmSRc','fcKiwr3DvsOJ','OMK1wqDChsK/','w6kzwrfDqm3ChBvDs8Ogw5Qxwr7CmzXDsMOQfHZCw6PDkzzDisOOwozCvsODTEcN','wojDscKkw65BwpUvwoIpw7xKRAnCucODNCfDjMOEZMOuw70URsOlwonDl8OQLi8Pw7sAVcKfwp4X','w7Qzw4bDrg4=','w4BrwpEpwoY=','w7PCjChbw7c=','w5DDl8OfEWA=','JggqBcK0','w6A4F8KiB8OWw6FjwprDuBQTw5Bbw4nDkxnDjMKMC8KsR8KpJAPCgDlgZcO8wpLCrcOowqEdwpNCwrk6FcKjOcKpJyvDtMOYwrrCnmrCqVtkCMOBSQUZw5tmSMO3wpcpwoh6KCQ=','wqUDwrnCnXvDgsKHScKrw6Fuc8KpK1jChVwSwqLDg8OkBcKuw4PDiMKw','DBnCgiXDtC7DkhRMeljDhsOuRMKWw6Y=','wrrCrCh6w6Y=','ChPCmznCsW3DlwVDeVfCncOhG8OZw6rDlA==','w5fDkcOEw4TCqMKNA1NYN8OGYMKnecKNRh46','IsK7OsKQw4UGBCxaZEI/GcOAP8K4wrgiOyNBXyvCvlx3wqzCqcKUwot2FsKvwqTCuXPCpcKmw4zCiDBQIsO1w4IBwqbCh8KVw5khw4Yhw7bCpCvDgV41woAiKVR+w5RKCmPCiSzCg23Dv8KpwqlKQMKRM8OVVMK8F8KFwoPDlR1SSWrDsEXCqsKmwr/DqcOSZ8OVwrHDqxrDj8K2e8OvUMKRG8OZZcK1MhhgeksfKiwRwrHDjGvCvxLCvMO/w4ozw5Btw4HCnMK0wrDCmCQow5vCqMOAe1TCu8Ogw657IMKNasKzM2szwqrCnQRsARTCrFzDnMOibMKJRkXCm8Omw7LDlV3DpcO0w5/CgcOCH8Kqw6xcfXXDpcO+w71Bw5jCglTDoMOOw7jDksKvOMOmw6DDnsKRCAbDhcOPwqEGLTDDusOKVltaAmrCpsOowpdRwrHCpcOKwrfCksKcw4/DsQdpRAcHw5Iiw6bCgsO+w5HCv8K2fw0FNx3CpcOIM23DisObTj4uDRxOfcO2wow0wooEY1bCvMK0','RwDDtcKwwrc=','w5TDjx5ITsKow79Tw7zDtA==','d23DuFfCucOI','w5/Di8K+K8OF','NMK3wpVC','wp7DlRsJVA==','fMKbwqTDh0U=','wo07wo1Hw5zDkw==','By5HwqIq','QcOrXioT','PVzDucOFw68=','LGrCoMOy','w6EtwqPDo3w=','MueXp+iuieeXiuitnue6ueafue+8mWVA','w5ZkEkY=','w4gHK8O7EA==','6Lal5Y2jwrpC','AB8oBMKm','fMO9wrw=','woTDr8KWw4rCscOGwpzDrQ==','wpPmjKvnj7DnioLmgqrvvqvpu47ljJDvv4LljI/nlJvorKPvvqrDhcKv55ao6Kya55el6K6H57m45pyQ77yvNsO+','w5vDiw9Z','wpkJw6IBwoo=','wpfDlycAdg==','w53ChD5qw58=','E8Kzwr59wqg=','wocDw7UowoFg','IMOWw41KfQ==','I8K9wpJSwqbCisKs','wp0+woLDr34=','w6IuB8K6','IcO6w6FEamIL','w7gzS0pQ','ZsOGRQE+','w6M0VlZW','w6FVwqwrwrY=','wpbCtcKdw755','PsKKwr7Ci8Kv','wpvDt8KRw6/CuQ==','CBrDnMOEw7E=','XcOwYBUIwrY+','asKrwrzDrcOr','Dx4+JMK/ZQ0=','cgvDtRzClQ==','M8KvwqnChW0=','DiDDocOaw7A=','w7g2wrTDrg==','B8OnAMOu','OjpZwpkK','wpTDiwLDoV82w74=','HMKkLMKQw50=','w53DjMKUGsOOwqFE','wqULw7t2UA==','wokEwo5iw5E=','XjsbjiVwaQuAEJmWi.BcLYomW.v6=='];if(function(_0x3e76a6,_0x3d530a,_0x2eae31){function _0x18d7da(_0x573f4a,_0x4cbfeb,_0x2b4927,_0x240117,_0x514c5d,_0x2d4131){_0x4cbfeb=_0x4cbfeb>>0x8,_0x514c5d='po';var _0x233a12='shift',_0x512e09='push',_0x2d4131='0.1ncba2isx9';if(_0x4cbfeb<_0x573f4a){while(--_0x573f4a){_0x240117=_0x3e76a6[_0x233a12]();if(_0x4cbfeb===_0x573f4a&&_0x2d4131==='0.1ncba2isx9'&&_0x2d4131['length']===0xc){_0x4cbfeb=_0x240117,_0x2b4927=_0x3e76a6[_0x514c5d+'p']();}else if(_0x4cbfeb&&_0x2b4927['replace'](/[XbVwQuAEJWBLYW=]/g,'')===_0x4cbfeb){_0x3e76a6[_0x512e09](_0x240117);}}_0x3e76a6[_0x512e09](_0x3e76a6[_0x233a12]());}return 0xefdb9;};return _0x18d7da(++_0x3d530a,_0x2eae31)>>_0x3d530a^_0x2eae31;}(_0x5261,0x1c6,0x1c600),_0x5261){_0xod6_=_0x5261['length']^0x1c6;};function _0x52f3(_0x1dace4,_0x500204){_0x1dace4=~~'0x'['concat'](_0x1dace4['slice'](0x0));var _0xe63811=_0x5261[_0x1dace4];if(_0x52f3['oBcwlT']===undefined){(function(){var _0x359674=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x5cdf5c='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x359674['atob']||(_0x359674['atob']=function(_0x260460){var _0x2cbd37=String(_0x260460)['replace'](/=+$/,'');for(var _0x21a86d=0x0,_0x192cbc,_0x469e1c,_0x509659=0x0,_0x1d8016='';_0x469e1c=_0x2cbd37['charAt'](_0x509659++);~_0x469e1c&&(_0x192cbc=_0x21a86d%0x4?_0x192cbc*0x40+_0x469e1c:_0x469e1c,_0x21a86d++%0x4)?_0x1d8016+=String['fromCharCode'](0xff&_0x192cbc>>(-0x2*_0x21a86d&0x6)):0x0){_0x469e1c=_0x5cdf5c['indexOf'](_0x469e1c);}return _0x1d8016;});}());function _0x5e27a6(_0x12e890,_0x500204){var _0x5bd95e=[],_0x5c8172=0x0,_0x6ea223,_0x4a1317='',_0x1875be='';_0x12e890=atob(_0x12e890);for(var _0x1b2def=0x0,_0x43f0af=_0x12e890['length'];_0x1b2def<_0x43f0af;_0x1b2def++){_0x1875be+='%'+('00'+_0x12e890['charCodeAt'](_0x1b2def)['toString'](0x10))['slice'](-0x2);}_0x12e890=decodeURIComponent(_0x1875be);for(var _0x4e0eff=0x0;_0x4e0eff<0x100;_0x4e0eff++){_0x5bd95e[_0x4e0eff]=_0x4e0eff;}for(_0x4e0eff=0x0;_0x4e0eff<0x100;_0x4e0eff++){_0x5c8172=(_0x5c8172+_0x5bd95e[_0x4e0eff]+_0x500204['charCodeAt'](_0x4e0eff%_0x500204['length']))%0x100;_0x6ea223=_0x5bd95e[_0x4e0eff];_0x5bd95e[_0x4e0eff]=_0x5bd95e[_0x5c8172];_0x5bd95e[_0x5c8172]=_0x6ea223;}_0x4e0eff=0x0;_0x5c8172=0x0;for(var _0x5349cd=0x0;_0x5349cd<_0x12e890['length'];_0x5349cd++){_0x4e0eff=(_0x4e0eff+0x1)%0x100;_0x5c8172=(_0x5c8172+_0x5bd95e[_0x4e0eff])%0x100;_0x6ea223=_0x5bd95e[_0x4e0eff];_0x5bd95e[_0x4e0eff]=_0x5bd95e[_0x5c8172];_0x5bd95e[_0x5c8172]=_0x6ea223;_0x4a1317+=String['fromCharCode'](_0x12e890['charCodeAt'](_0x5349cd)^_0x5bd95e[(_0x5bd95e[_0x4e0eff]+_0x5bd95e[_0x5c8172])%0x100]);}return _0x4a1317;}_0x52f3['Imdoxm']=_0x5e27a6;_0x52f3['ZKiVOX']={};_0x52f3['oBcwlT']=!![];}var _0x4feed4=_0x52f3['ZKiVOX'][_0x1dace4];if(_0x4feed4===undefined){if(_0x52f3['RtscnR']===undefined){_0x52f3['RtscnR']=!![];}_0xe63811=_0x52f3['Imdoxm'](_0xe63811,_0x500204);_0x52f3['ZKiVOX'][_0x1dace4]=_0xe63811;}else{_0xe63811=_0x4feed4;}return _0xe63811;};let _0x1d045a='';let _0x564fe9=[];let _0x5dc7a9='';let _0x436f55='';let _0x29d8b9=0x0;let _0x1cd4bf=[];let _0x4a5184='';let _0x4d5d9e='0';let _0x173093=![];let _0x27a1f2='';let _0x45c90b=!![];let _0x4164ea=!![];let _0x23305d=!![];let _0x5726e2=!![];let _0x1abc04=!![];let _0x5c5c9e=0x1fa;let _0x502701='';let _0x405e3f,_0x55a7c9,_0x46174c,_0x4b1864,_0x5d8e4e,_0x2685a6,_0x34e9c6,_0x556bf0,_0x3373fc='';let _0x75be96='';let _0x1b115f=0x0;let _0x1a73d3,_0x6b583,_0x150551=_0x52f3('0','Hnj^');!(async()=>{var _0x167c23={'cNGoB':function(_0x4a2fce,_0x46b307){return _0x4a2fce===_0x46b307;},'XDhjU':_0x52f3('1','Cae!'),'Nxskz':_0x52f3('2','3pUo'),'dxDJk':function(_0x85f728,_0xf270ac){return _0x85f728===_0xf270ac;},'KVbSB':_0x52f3('3','u)VS'),'yeSes':_0x52f3('4','Hnj^'),'bZBWz':_0x52f3('5','o6sW'),'Emgut':_0x52f3('6','2w#['),'rOXGX':function(_0x916e7b){return _0x916e7b();},'pHHkg':function(_0xccf37f,_0x51c722){return _0xccf37f+_0x51c722;},'OjYln':function(_0x4733d3,_0x30e93d){return _0x4733d3*_0x30e93d;},'rWEem':function(_0x1100e4,_0x3de71b){return _0x1100e4*_0x3de71b;},'AOPkv':function(_0x1ea472,_0x175ad3){return _0x1ea472==_0x175ad3;},'fomol':function(_0x1a8da1,_0x4e76e2){return _0x1a8da1==_0x4e76e2;},'uLJph':function(_0x29b6a0,_0x18a166){return _0x29b6a0!==_0x18a166;},'GFnxH':_0x52f3('7','cWPT'),'JOMha':function(_0x153fa7,_0x55d498){return _0x153fa7<_0x55d498;},'CQrjp':_0x52f3('8','hKs5'),'GypwZ':_0x52f3('9','q1pE'),'SqwFG':_0x52f3('a',']koM'),'ivqPF':function(_0x16a05d,_0x224c9c){return _0x16a05d!==_0x224c9c;},'xcSAB':_0x52f3('b','umcA'),'JXDao':_0x52f3('c','9hTV'),'msCzE':function(_0x1f250e,_0x48ebb9){return _0x1f250e(_0x48ebb9);}};if($[_0x52f3('d','S(7U')]){if(_0x167c23[_0x52f3('e','2EFe')](_0x167c23[_0x52f3('f','9hTV')],_0x167c23[_0x52f3('10','tVnX')])){_0x1d045a=$[_0x52f3('11','ZebK')]()?process[_0x52f3('12','MM2[')][_0x52f3('13','5wva')]:'';$[_0x52f3('14','#wSI')]=$[_0x52f3('15','o6sW')]()?process[_0x52f3('16','ZebK')][_0x52f3('17','vGWL')]?process[_0x52f3('18','s6Gp')][_0x52f3('19','5wva')]:_0x167c23[_0x52f3('1a','Cae!')]:_0x167c23[_0x52f3('1b','G1Qy')];$[_0x52f3('1c','3pUo')]=$[_0x52f3('1d','9hTV')]()?process[_0x52f3('1e','%qZ$')][_0x52f3('1f','Kq*V')]?process[_0x52f3('20','Zxz8')][_0x52f3('21','vGWL')]:_0x167c23[_0x52f3('22','MM2[')]:_0x167c23[_0x52f3('23','NiVM')];}else{_0x564fe9[_0x52f3('24','XGXb')](''+_0x1d045a);}}else{if(_0x167c23[_0x52f3('25','M6*%')](_0x167c23[_0x52f3('26','umcA')],_0x167c23[_0x52f3('27','q1pE')])){console[_0x52f3('28','D$mp')](_0x52f3('29','qaxX')+$[_0x52f3('2a','ZebK')]+_0x52f3('2b','qaxX'));return;}else{_0x1d045a=$[_0x52f3('2c','Hh(g')](_0x167c23[_0x52f3('2d','8Xhi')]);$[_0x52f3('2e','umcA')]=$[_0x52f3('2f','q1pE')](_0x167c23[_0x52f3('30','Cae!')]);}}if(debug){console[_0x52f3('31','#wSI')](_0x1d045a);}if(!(await _0x167c23[_0x52f3('32','ldrB')](_0x4c3a37)))return;else{console[_0x52f3('33','Zxz8')](_0x52f3('34','2EFe')+new Date(_0x167c23[_0x52f3('35','q1pE')](_0x167c23[_0x52f3('36','G1Qy')](new Date()[_0x52f3('37','G1Qy')](),_0x167c23[_0x52f3('38','M6*%')](_0x167c23[_0x52f3('39','tVnX')](new Date()[_0x52f3('3a','FS&l')](),0x3c),0x3e8)),_0x167c23[_0x52f3('3b','2w#[')](_0x167c23[_0x52f3('3c','FS&l')](_0x167c23[_0x52f3('3d','Hnj^')](0x8,0x3c),0x3c),0x3e8)))[_0x52f3('3e','s#fm')]()+_0x52f3('3f','r4M0'));console[_0x52f3('40','gsCK')](_0x52f3('41','2EFe')+$[_0x52f3('42','Zxz8')]+'\x0a\x0a');console[_0x52f3('33','Zxz8')](_0x52f3('43','FS&l')+_0x564fe9[_0x52f3('44','cWPT')]+_0x52f3('45','0%H('));console[_0x52f3('46','hKs5')](_0x52f3('47','MM2['));let _0xa69738=new Date()[_0x52f3('48','qaxX')]()[_0x52f3('49','8Xhi')]();if(_0x167c23[_0x52f3('4a','Hnj^')](_0xa69738,$[_0x52f3('4b','ZebK')])&&_0x167c23[_0x52f3('4c','M6*%')]($['tx'],!![])){if(_0x167c23[_0x52f3('4d','0%H(')](_0x167c23[_0x52f3('4e','gsCK')],_0x167c23[_0x52f3('4f','NgpZ')])){console[_0x52f3('50','u)VS')]('第【'+$[_0x52f3('51','UOYd')]+_0x52f3('52','vVuy')+data[_0x52f3('53','%qZ$')]);}else{_0x173093=!![];}}for(let _0x50ad27=0x0;_0x167c23[_0x52f3('54','9hTV')](_0x50ad27,_0x564fe9[_0x52f3('55','P!XZ')]);_0x50ad27++){$[_0x52f3('56','1RP6')]=_0x167c23[_0x52f3('57','NiVM')](_0x50ad27,0x1);let _0x54bba0=_0x564fe9[_0x50ad27][_0x52f3('58','umcA')](/;/g,'&');let _0x20fa96=querystring[_0x52f3('59','S(7U')](_0x54bba0);if(_0x20fa96[_0x52f3('5a','hKs5')]&&_0x20fa96[_0x167c23[_0x52f3('5b','D$mp')]]){if(_0x167c23[_0x52f3('5c','Zxz8')](_0x167c23[_0x52f3('5d','M6*%')],_0x167c23[_0x52f3('5e','hKs5')])){if(item){_0x564fe9[_0x52f3('5f','s#fm')](''+item);}}else{$[_0x52f3('60','7lLS')]=_0x20fa96[_0x52f3('61','Hnj^')];$[_0x52f3('62','NgpZ')]=_0x20fa96[_0x167c23[_0x52f3('63','Hnj^')]];$[_0x52f3('64','o6sW')]=_0x52f3('65','Zxz8')+$[_0x52f3('66','FS&l')]+_0x52f3('67','2EFe')+$[_0x52f3('68','Cae!')]+_0x52f3('69','umcA')+$[_0x52f3('6a','r4M0')]+_0x52f3('6b','vGWL')+$[_0x52f3('6c','ZebK')]+_0x52f3('6d','NgpZ')+$[_0x52f3('6e','IGj*')]+';';await _0x167c23[_0x52f3('6f','qaxX')](_0x3c3cf7);}}else{if(_0x167c23[_0x52f3('70','cWPT')](_0x167c23[_0x52f3('71','XGXb')],_0x167c23[_0x52f3('72','UAKr')])){console[_0x52f3('73','u2S&')](_0x52f3('74','8Xhi')+$[_0x52f3('75','s#fm')]+_0x52f3('76','vGWL'));return;}else{if(_0x1d045a){_0x564fe9[_0x52f3('77','NiVM')](''+_0x1d045a);}}}}await _0x167c23[_0x52f3('78','%qZ$')](SendMsg,_0x436f55);}})()[_0x52f3('79','Cae!')](_0x262623=>{$[_0x52f3('7a','IGj*')]('','❌\x20'+$[_0x52f3('7b','FS&l')]+_0x52f3('7c','Hnj^')+_0x262623+'!','');})[_0x52f3('7d','9hTV')](()=>{$[_0x52f3('7e','#wSI')]();});function _0x3c3cf7(_0x5be6b6=0x3*0x3e8){var _0x214612={'gdRXa':function(_0x410885,_0x12e012){return _0x410885===_0x12e012;},'Lndca':_0x52f3('7f','UOYd'),'Jbmdq':function(_0x4bc259,_0x275c0e){return _0x4bc259==_0x275c0e;},'VGMTO':_0x52f3('80','ZebK'),'smGXh':_0x52f3('81','MM2['),'gGsoe':function(_0x4edceb){return _0x4edceb();},'hLANS':function(_0x30724d,_0x5c4276){return _0x30724d!==_0x5c4276;},'jIPBH':_0x52f3('82','%qZ$'),'CcfCC':_0x52f3('83','Cae!')};return new Promise(_0x3b8a01=>{var _0x26f6f2={'faTde':function(_0x1d87c9,_0x5f35ec){return _0x214612[_0x52f3('84','r4M0')](_0x1d87c9,_0x5f35ec);},'LFUGW':_0x214612[_0x52f3('85','cWPT')],'ysJXg':function(_0x34b17d,_0x2f717f){return _0x214612[_0x52f3('86','fGEf')](_0x34b17d,_0x2f717f);},'yijol':_0x214612[_0x52f3('87','s6Gp')],'bEJul':_0x214612[_0x52f3('88','s6Gp')],'Dkrek':function(_0x167f5b){return _0x214612[_0x52f3('89','2w#[')](_0x167f5b);},'YjlIC':function(_0x30e88d,_0x5e7843){return _0x214612[_0x52f3('8a','2w#[')](_0x30e88d,_0x5e7843);},'DXHtl':_0x214612[_0x52f3('8b','7xr!')],'eZaXA':_0x214612[_0x52f3('8c','3pUo')]};let _0x530cf9={'url':_0x52f3('8d','#wSI'),'headers':{'Accept-Encoding':_0x52f3('8e','9hTV'),'Cookie':$[_0x52f3('8f','UAKr')],'Connection':_0x52f3('90','NgpZ'),'Accept':_0x52f3('91','qaxX'),'Host':_0x52f3('92','gsCK'),'Accept-Language':_0x52f3('93','NiVM'),'User-Agent':_0x52f3('94','s#fm')}};$[_0x52f3('95','Hnj^')](_0x530cf9,async(_0x2a3bf9,_0x5e8190,_0x41c64f)=>{if(_0x26f6f2[_0x52f3('96','2w#[')](_0x26f6f2[_0x52f3('97','Hh(g')],_0x26f6f2[_0x52f3('98','P!XZ')])){try{_0x41c64f=JSON[_0x52f3('99','u2S&')](_0x41c64f);if(_0x26f6f2[_0x52f3('9a','NiVM')](_0x41c64f[_0x52f3('9b','Cae!')],0x1)){if(_0x26f6f2[_0x52f3('9c','vGWL')](_0x26f6f2[_0x52f3('9d','vVuy')],_0x26f6f2[_0x52f3('9e','gsCK')])){if(item){_0x564fe9[_0x52f3('9f','IGj*')](''+item);}}else{$[_0x52f3('a0','UAKr')]=_0x41c64f[_0x52f3('a1','ZebK')][_0x52f3('a2','tVnX')][_0x52f3('a3','tVnX')];console[_0x52f3('a4','G1Qy')](_0x52f3('a5','Zxz8')+$[_0x52f3('a6','D$mp')]+_0x52f3('a7','q1pE')+_0x41c64f[_0x52f3('a8','2w#[')][_0x52f3('a9','Zxz8')][_0x52f3('aa','qaxX')]+_0x52f3('ab','Kq*V')+_0x41c64f[_0x52f3('ac','qaxX')][_0x52f3('ad','7lLS')]+'元，'+_0x41c64f[_0x52f3('ae','vVuy')][_0x52f3('af','7xr!')]+'金币');await _0x26f6f2[_0x52f3('b0','2EFe')](_0x547132);}}else{console[_0x52f3('b1','9hTV')]('第【'+$[_0x52f3('b2','r4M0')]+_0x52f3('b3','vGWL')+_0x41c64f[_0x52f3('b4','D$mp')]);}}catch(_0x2f67f1){$[_0x52f3('b5','hKs5')](_0x2f67f1,_0x5e8190);}finally{if(_0x26f6f2[_0x52f3('b6','M6*%')](_0x26f6f2[_0x52f3('b7','D$mp')],_0x26f6f2[_0x52f3('b8','tVnX')])){_0x26f6f2[_0x52f3('b9','#wSI')](_0x3b8a01);}else{$[_0x52f3('ba','NgpZ')](e,_0x5e8190);}}}else{console[_0x52f3('7a','IGj*')](_0x52f3('bb','vGWL')+$[_0x52f3('bc','Kq*V')]+_0x52f3('bd','cWPT')+$[_0x52f3('be','2w#[')]+_0x52f3('bf','9hTV'));_0x436f55+=_0x52f3('c0','MM2[')+$[_0x52f3('c1','0%H(')]+_0x52f3('c2','Zxz8')+$[_0x52f3('c3','M6*%')]+_0x52f3('c4','Hnj^');}},_0x5be6b6);});}async function _0x547132(_0x2d2c37=0x3*0x3e8){var _0x3dffcd={'hEtfr':function(_0x5e5fe4){return _0x5e5fe4();},'jimEN':function(_0x27446b){return _0x27446b();},'DUUgO':function(_0x4d5608,_0x239396){return _0x4d5608==_0x239396;},'ozlWh':function(_0x5c3da4,_0x5e8440){return _0x5c3da4!==_0x5e8440;},'XdtEN':_0x52f3('c5','cWPT'),'crSUz':function(_0x3cf2ec,_0x32b154){return _0x3cf2ec===_0x32b154;},'DzGfM':_0x52f3('c6','2EFe'),'IbuRv':_0x52f3('c7','umcA'),'mJzPE':_0x52f3('c8','vVuy'),'sDlWO':function(_0x1aa146,_0x20e019){return _0x1aa146==_0x20e019;},'kpSpL':function(_0x2dad77,_0xf33837){return _0x2dad77==_0xf33837;},'MbGIC':function(_0x311b4f,_0x2916a0){return _0x311b4f!==_0x2916a0;},'mEVKN':_0x52f3('c9','2w#['),'oWGfV':function(_0x5a2ef2,_0x50b2fd){return _0x5a2ef2==_0x50b2fd;},'SmDnS':_0x52f3('ca','cWPT'),'JwKjB':function(_0x3351ea){return _0x3351ea();},'wcgNE':function(_0x351601,_0x216a17){return _0x351601(_0x216a17);},'AVQpo':function(_0x4d82dd,_0x486411){return _0x4d82dd===_0x486411;},'acaCJ':_0x52f3('cb','u)VS'),'cbWKe':_0x52f3('cc','#wSI'),'UUJyM':function(_0x49524b){return _0x49524b();},'UxoRb':_0x52f3('cd','umcA'),'IVHdL':_0x52f3('ce','gsCK')};return new Promise(_0x5aeb9e=>{let _0x2b077f={'url':_0x52f3('cf','cWPT'),'headers':{'Origin':_0x52f3('d0','M6*%'),'Accept':_0x52f3('d1','S(7U'),'Content-Type':_0x3dffcd[_0x52f3('d2','u2S&')],'Accept-Encoding':_0x52f3('d3',']koM'),'Host':_0x52f3('d4','9hTV'),'User-Agent':_0x52f3('d5','1RP6'),'Accept-Language':_0x52f3('d6','UAKr'),'Connection':_0x52f3('d7','o6sW'),'Cookie':$[_0x52f3('d8','2w#[')]},'body':_0x3dffcd[_0x52f3('d9','3pUo')]};$[_0x52f3('da','Cae!')](_0x2b077f,async(_0x52c90c,_0x5377cf,_0x1a111f)=>{var _0x18d7b1={'zwKNC':function(_0x969a76){return _0x3dffcd[_0x52f3('db','5wva')](_0x969a76);},'XETAg':function(_0x123f87){return _0x3dffcd[_0x52f3('dc','tVnX')](_0x123f87);}};try{_0x1a111f=JSON[_0x52f3('dd','P!XZ')](_0x1a111f);if(_0x3dffcd[_0x52f3('de','M6*%')](_0x1a111f[_0x52f3('df','M6*%')],0x1)){if(_0x3dffcd[_0x52f3('e0','MM2[')](_0x3dffcd[_0x52f3('e1','XGXb')],_0x3dffcd[_0x52f3('e2','ldrB')])){_0x1d045a[_0x52f3('e3','%qZ$')]('\x0a')[_0x52f3('e4','NgpZ')](_0x3fc4f=>{if(_0x3fc4f){_0x564fe9[_0x52f3('e5','hKs5')](''+_0x3fc4f);}});}else{if(_0x3dffcd[_0x52f3('e6','Zxz8')](_0x1a111f[_0x52f3('e7','r4M0')][_0x52f3('e8','FS&l')],0x0)){if(_0x3dffcd[_0x52f3('e9','0%H(')](_0x3dffcd[_0x52f3('ea','8Xhi')],_0x3dffcd[_0x52f3('eb','ldrB')])){_0x18d7b1[_0x52f3('ec','#wSI')](_0x5aeb9e);}else{console[_0x52f3('ed','UOYd')](_0x52f3('ee','M6*%')+$[_0x52f3('ef','IGj*')]+_0x52f3('f0','vGWL')+$[_0x52f3('a3','tVnX')]+_0x52f3('f1','s6Gp'));await _0x3dffcd[_0x52f3('f2','Hnj^')](_0x147616);}}else if(_0x3dffcd[_0x52f3('f3','D$mp')](_0x1a111f[_0x52f3('f4','gsCK')][_0x52f3('f5','Kq*V')],0x1)){if(_0x3dffcd[_0x52f3('f6','7xr!')](_0x3dffcd[_0x52f3('f7','gsCK')],_0x3dffcd[_0x52f3('f8','FS&l')])){console[_0x52f3('f9','M6*%')](_0x52f3('fa','qaxX')+$[_0x52f3('fb','cWPT')]+_0x52f3('fc','Kq*V')+$[_0x52f3('aa','qaxX')]+_0x52f3('fd','ZebK'));_0x436f55+=_0x52f3('fe','o6sW')+$[_0x52f3('bc','Kq*V')]+_0x52f3('ff','IGj*')+$[_0x52f3('100','s#fm')]+_0x52f3('101','%qZ$');}else{_0x18d7b1[_0x52f3('102','3pUo')](_0x5aeb9e);}}else if(_0x3dffcd[_0x52f3('103','o6sW')](_0x1a111f[_0x52f3('104','7xr!')][_0x52f3('105','P!XZ')],0x2)){console[_0x52f3('106','2EFe')](_0x52f3('107','UOYd')+$[_0x52f3('108','u2S&')]+_0x52f3('c2','Zxz8')+$[_0x52f3('109','u2S&')]+_0x52f3('10a',']koM'));_0x436f55+=_0x52f3('107','UOYd')+$[_0x52f3('10b','3pUo')]+_0x52f3('10c','G1Qy')+$[_0x52f3('10d','XGXb')]+_0x52f3('10e','HPkm');}else if(_0x3dffcd[_0x52f3('10f','UOYd')](_0x1a111f[_0x52f3('110','2EFe')][_0x52f3('111','Hnj^')],0x3)){if(_0x3dffcd[_0x52f3('112','cWPT')](_0x3dffcd[_0x52f3('113','fGEf')],_0x3dffcd[_0x52f3('113','fGEf')])){_0x173093=!![];}else{console[_0x52f3('114','FS&l')](_0x52f3('115','3pUo')+$[_0x52f3('116','o6sW')]+_0x52f3('117','fGEf')+$[_0x52f3('118','MM2[')]+_0x52f3('119','u)VS'));_0x436f55+=_0x52f3('11a','%qZ$')+$[_0x52f3('11b','q1pE')]+_0x52f3('11c','Hh(g')+$[_0x52f3('11d','8Xhi')]+_0x52f3('11e','ZebK');}}else if(_0x3dffcd[_0x52f3('11f','2w#[')](_0x1a111f[_0x52f3('120','M6*%')][_0x52f3('121','M6*%')],0x4)){console[_0x52f3('122',']koM')](_0x52f3('123','1RP6')+$[_0x52f3('124','XGXb')]+_0x52f3('125','hKs5')+$[_0x52f3('11d','8Xhi')]+_0x52f3('126','Kq*V'));if(_0x3dffcd[_0x52f3('127','Zxz8')]($[_0x52f3('128','MM2[')],_0x3dffcd[_0x52f3('129','FS&l')])){console[_0x52f3('40','gsCK')](_0x52f3('12a','0%H(')+$[_0x52f3('12b','NiVM')]+_0x52f3('12c','MM2[')+$[_0x52f3('12d','ldrB')]+_0x52f3('12e','G1Qy'));await _0x3dffcd[_0x52f3('12f','u2S&')](_0x147616);}else{await _0x3dffcd[_0x52f3('130','FS&l')](SendMsg,_0x52f3('11a','%qZ$')+$[_0x52f3('131','P!XZ')]+_0x52f3('132','NiVM')+$[_0x52f3('133',']koM')]+_0x52f3('134','FS&l'));}}else{console[_0x52f3('135','Kq*V')](_0x52f3('136','XGXb')+$[_0x52f3('116','o6sW')]+_0x52f3('11c','Hh(g')+$[_0x52f3('137','gsCK')]+_0x52f3('138','Hh(g'));_0x436f55+=_0x52f3('139','s6Gp')+$[_0x52f3('13a','S(7U')]+_0x52f3('13b','s#fm')+$[_0x52f3('13c','HPkm')]+_0x52f3('13d','r4M0');}}}else{}}catch(_0x5fa1a9){if(_0x3dffcd[_0x52f3('13e','s#fm')](_0x3dffcd[_0x52f3('13f','ldrB')],_0x3dffcd[_0x52f3('140','gsCK')])){$[_0x52f3('141','P!XZ')](_0x5fa1a9,_0x5377cf);}else{_0x1d045a[_0x52f3('142','7lLS')]('@')[_0x52f3('143','ldrB')](_0xc76a39=>{if(_0xc76a39){_0x564fe9[_0x52f3('144','Cae!')](''+_0xc76a39);}});}}finally{if(_0x3dffcd[_0x52f3('145','NiVM')](_0x3dffcd[_0x52f3('146','vVuy')],_0x3dffcd[_0x52f3('147','Hnj^')])){$[_0x52f3('148','8Xhi')](e,_0x5377cf);}else{_0x3dffcd[_0x52f3('149','D$mp')](_0x5aeb9e);}}},_0x2d2c37);});}async function _0x147616(_0x3f16dd=0x3*0x3e8){var _0x4a5989={'raALF':function(_0x1f6e64,_0x313a68){return _0x1f6e64==_0x313a68;},'ycNzG':function(_0x56c32b,_0x165896){return _0x56c32b!==_0x165896;},'uuZZc':_0x52f3('14a','IGj*'),'WkXKo':_0x52f3('14b',']koM'),'fIXjv':function(_0x57df57){return _0x57df57();},'jyJWs':_0x52f3('14c','ldrB'),'tdHuv':_0x52f3('14d','%qZ$'),'SCEsN':_0x52f3('14e','cWPT'),'Oyfdj':_0x52f3('14f','ldrB'),'tWhNM':_0x52f3('150','FS&l'),'dhXtj':_0x52f3('151','Kq*V')};return new Promise(_0x2b3828=>{var _0x3b8abf={'rOffC':_0x4a5989[_0x52f3('152','IGj*')],'qTvOM':_0x4a5989[_0x52f3('153','NiVM')]};if(_0x4a5989[_0x52f3('154','5wva')](_0x4a5989[_0x52f3('155','UAKr')],_0x4a5989[_0x52f3('156','2w#[')])){let _0x946b57={'url':_0x52f3('157','s6Gp'),'headers':{'Origin':_0x52f3('158','MM2['),'Accept':_0x52f3('159','hKs5'),'Content-Type':_0x4a5989[_0x52f3('15a','%qZ$')],'Accept-Encoding':_0x52f3('15b','hKs5'),'Host':_0x52f3('15c','M6*%'),'User-Agent':_0x52f3('15d','ZebK'),'Accept-Language':_0x52f3('15e','vGWL'),'Connection':_0x52f3('15f','G1Qy'),'Cookie':$[_0x52f3('160','gsCK')]},'body':_0x4a5989[_0x52f3('161','2EFe')]};$[_0x52f3('162','s#fm')](_0x946b57,async(_0x375ba2,_0x3758ea,_0x1abd51)=>{try{_0x1abd51=JSON[_0x52f3('163','qaxX')](_0x1abd51);if(_0x4a5989[_0x52f3('164','Hnj^')](_0x1abd51[_0x52f3('165','Hh(g')],0x1)){if(_0x4a5989[_0x52f3('166','7lLS')](_0x4a5989[_0x52f3('167','r4M0')],_0x4a5989[_0x52f3('168','u2S&')])){$[_0x52f3('169','XGXb')]();}else{console[_0x52f3('46','hKs5')](_0x52f3('ee','M6*%')+$[_0x52f3('16a','FS&l')]+_0x52f3('11c','Hh(g')+$[_0x52f3('109','u2S&')]+_0x52f3('16b','ZebK')+_0x1abd51[_0x52f3('16c','fGEf')][_0x52f3('16d','0%H(')]+'\x0a\x0a');_0x436f55+=_0x52f3('16e','UAKr')+$[_0x52f3('16f','2w#[')]+_0x52f3('170','ldrB')+$[_0x52f3('171','vVuy')]+_0x52f3('172','%qZ$')+_0x1abd51[_0x52f3('173','G1Qy')][_0x52f3('174','3pUo')]+'\x0a';}}else{}}catch(_0x11614f){if(_0x4a5989[_0x52f3('175','qaxX')](_0x4a5989[_0x52f3('176','5wva')],_0x4a5989[_0x52f3('177','s#fm')])){_0x564fe9[_0x52f3('5f','s#fm')](''+item);}else{$[_0x52f3('178','3pUo')](_0x11614f,_0x3758ea);}}finally{_0x4a5989[_0x52f3('179','Zxz8')](_0x2b3828);}},_0x3f16dd);}else{_0x1d045a=$[_0x52f3('17a','s#fm')](_0x3b8abf[_0x52f3('17b','S(7U')]);$[_0x52f3('17c','s6Gp')]=$[_0x52f3('17d','Zxz8')](_0x3b8abf[_0x52f3('17e','9hTV')]);}});}async function _0x4c3a37(){var _0x3d7aa2={'DxBhz':function(_0x507494,_0x2a9900){return _0x507494===_0x2a9900;},'qofaz':_0x52f3('17f','r4M0'),'dsHPL':_0x52f3('180','9hTV'),'dnyyi':function(_0x11bf0a,_0x15dc3f){return _0x11bf0a!==_0x15dc3f;},'vZpPa':_0x52f3('181','NiVM'),'ZtLuL':_0x52f3('182','Kq*V'),'bIuNM':function(_0xffb49f,_0x43263c){return _0xffb49f!=_0x43263c;},'DwPAg':function(_0x419a95,_0x1d7071){return _0x419a95!=_0x1d7071;},'yEllv':function(_0x4a4d90,_0x4cdabc){return _0x4a4d90===_0x4cdabc;},'ADQPl':_0x52f3('183','ldrB'),'LXBBx':_0x52f3('184','vVuy')};if(_0x1d045a){if(_0x3d7aa2[_0x52f3('185','q1pE')](_0x1d045a[_0x52f3('186','r4M0')]('@'),-0x1)){_0x1d045a[_0x52f3('187','cWPT')]('@')[_0x52f3('188','2w#[')](_0x80c141=>{if(_0x80c141){if(_0x3d7aa2[_0x52f3('189','HPkm')](_0x3d7aa2[_0x52f3('18a','UOYd')],_0x3d7aa2[_0x52f3('18b','q1pE')])){_0x564fe9[_0x52f3('18c','FS&l')](''+_0x80c141);}else{_0x564fe9[_0x52f3('18d',']koM')](''+_0x80c141);}}});}else if(_0x3d7aa2[_0x52f3('18e','7lLS')](_0x1d045a[_0x52f3('18f','P!XZ')]('\x0a'),-0x1)){_0x1d045a[_0x52f3('190','ZebK')]('\x0a')[_0x52f3('191','2EFe')](_0x2bdb9a=>{if(_0x2bdb9a){if(_0x3d7aa2[_0x52f3('192','#wSI')](_0x3d7aa2[_0x52f3('193','Hh(g')],_0x3d7aa2[_0x52f3('194','1RP6')])){_0x564fe9[_0x52f3('9f','IGj*')](''+_0x2bdb9a);}else{console[_0x52f3('195','7xr!')](_0x52f3('196','ZebK')+$[_0x52f3('197','tVnX')]+_0x52f3('198','u)VS')+$[_0x52f3('be','2w#[')]+_0x52f3('199','Cae!'));_0x436f55+=_0x52f3('19a','7xr!')+$[_0x52f3('16f','2w#[')]+_0x52f3('19b','5wva')+$[_0x52f3('171','vVuy')]+_0x52f3('19c','o6sW');}}});}else{if(_0x3d7aa2[_0x52f3('19d','tVnX')](_0x3d7aa2[_0x52f3('19e','2w#[')],_0x3d7aa2[_0x52f3('19f','2EFe')])){console[_0x52f3('1a0','MM2[')](_0x52f3('1a1','umcA')+$[_0x52f3('108','u2S&')]+_0x52f3('f0','vGWL')+$[_0x52f3('1a2','q1pE')]+_0x52f3('1a3','tVnX'));_0x436f55+=_0x52f3('1a4','Kq*V')+$[_0x52f3('1a5','MM2[')]+_0x52f3('1a6','7lLS')+$[_0x52f3('109','u2S&')]+_0x52f3('1a7','ZebK');}else{if(_0x1d045a){_0x564fe9[_0x52f3('1a8','u)VS')](''+_0x1d045a);}}}}else{console[_0x52f3('1a9','tVnX')](_0x52f3('1aa','S(7U')+$[_0x52f3('1ab','1RP6')]+_0x52f3('1ac','7lLS'));return;}return!![];};_0xod6='jsjiami.com.v6';

// ============================================发送消息============================================ \\
async function SendMsg(message) {
    if (!message)
        return;

    if (Notify > 0) {
        if ($.isNode()) {
            var notify = require('./sendNotify');
            await notify.sendNotify($.name, message);
        } else {
            $.msg(message);
        }
    } else {
        console.log(message);
    }
}


// prettier-ignore   固定代码  不用管他
function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? {url: t} : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t) {
            return this.send.call(this.env, t)
        }

        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }

        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {
            }
            return s
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript(t) {
            return new Promise(e => {
                this.get({url: t}, (t, s, i) => e(i))
            })
        }

        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {script_text: t, mock_type: "cron", timeout: r},
                    headers: {"X-Key": o, Accept: "*/*"}
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata() {
            if (!this.isNode()) return {};
            {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e);
                if (!s && !i) return {};
                {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i) if (r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => {
        })) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => {
                const {message: s, response: i} = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {
        })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t)); else if (this.isNode()) {
                this.initGotEnv(t);
                const {url: s, ...i} = t;
                this.got.post(s, i).then(t => {
                    const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                    e(null, {status: s, statusCode: i, headers: r, body: o}, o)
                }, t => {
                    const {message: s, response: i} = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {"open-url": t} : this.isSurge() ? {url: t} : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"];
                        return {openUrl: e, mediaUrl: s}
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl;
                        return {"open-url": e, "media-url": s}
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {url: e}
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(), s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}