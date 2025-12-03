import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getJakartaTime } from "@/utils/helper";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET() {
  try {
    const rooms = await prisma.roomStats.findMany({
      select: { roomId: true, username: true }
    });

    const ROOM_MAP = Object.fromEntries(
      rooms.map(r => [r.roomId, r.username])
    );

    const ROOM_IDS = rooms.map(r => r.roomId);


    for (const roomId of ROOM_IDS) {
      const payload = {
        request: {
          room_filter: {
            room_id: roomId,
            is_content_type: 1,
            shop_id: "7494930113907558878",
            country: "ID",
          },
          sorting_type: 1,
          stats_types: [23,20,322,310,39,29,332,330,10,323,349,70,43,30,71,72,341,342,2,5,18,290,291,292,-23,-20,-39,-330,-10,-70,-41,-71,-341,-342,-2,-18],
          ts: Date.now(),
        },
      };

      const response = await fetch(
        "https://seller-id.tokopedia.com/api/v1/insights/workbench/live/detail/core/stats?app_name=i18n_ecom_shop&device_id=0&fp=verify_mhvna0ng_rhbcnDg4_69aX_4h9F_8WRs_hhWmYFrIW1Yn&device_platform=web&cookie_enabled=true&screen_width=1680&screen_height=1050&browser_language=en-US&browser_platform=MacIntel&browser_name=Mozilla&browser_version=5.0+(Macintosh%3B+Intel+Mac+OS+X+10_15_7)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F142.0.0.0+Safari%2F537.36&browser_online=true&timezone_name=Asia%2FJakarta&vertical=2&oec_seller_id=7494930113907558878",
        {
          method: "POST",
          headers: {
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json",
            "Cookie": "DID=a8e0bd4eb23794d9be2564131b58730856a78d4fbe25f1780ded9e957b77d6f0498bd0b7312412f9c6971b88010c4de9; _tt_enable_cookie=1; _ttp=01JXF1B7Z00TKR6HXYBSVJ2TB7_.tt.1; hfv_banner=true; _gcl_au=1.1.721021949.1760415321; _fbp=fb.1.1760415718214.238844213228639297; _CASE_=227b38103d7b637b6b68686968686d6a6e7b757b3a103d7b63686e68757b3d103d7b636c6f6a6b757b350c293d7b637b7b757b35382d7b637b746f776d686f6e6a6b6e616169616c606b606c7b757b353b357b637b0b2c34383179102b3f38377b757b3536373e7b637b68696f77616f6a6b6d6061606e6869696f7b757b291a367b637b686f6d6c687b757b2a103d7b637b697b757b2a0d20293c7b637b7b757b2e103d7b637b697b757b2e312a2a7b637b02047b24; _UUID_CAS_=c0495af8-9c6a-47a4-8172-c7efd8c895bd; ISID=%7B%22www.tokopedia.com%22%3A%22d3d3LnRva29wZWRpYS5jb20%3D.8e8a93f43611847b0ae440da48c36985.1751530474580.1751530474580.1760465180736.10%22%7D; ttcsid_CPTR1KRC77UF05LN2NAG=1760892209071::dvYVW53O5B6Iv12aZy9_.6.1760892653131.0; s_v_web_id=verify_mhvna0ng_rhbcnDg4_69aX_4h9F_8WRs_hhWmYFrIW1Yn; tt_ticket_guard_client_web_domain=2; passport_csrf_token=3b0d06a6020456ecd9e424c26fbbe3d3; passport_csrf_token_default=3b0d06a6020456ecd9e424c26fbbe3d3; sso_auth_status=60c5571fb597afb325e8743ea343fb58; sso_auth_status_ss=60c5571fb597afb325e8743ea343fb58; i18next=en; gs_seller_type_for_report=pop; _tt_ticket_crypt_doamin=2; ATLAS_LANG=en; pre_country=ID; lang_type=en; passport_fe_beating_status=true; d_ticket=449def365b757bd9ad420bf0a50bfcf9526bf; l=0; aus=0; laf=0; TOPATK=0; TOPRTK=0; tuid=0; _tu_prod=0; gec_id=0; uidh=0; uide=0; _CAS_=0; FPF=0; lasty=; g_yolo_production=1; DID_JS=YThlMGJkNGViMjM3OTRkOWJlMjU2NDEzMWI1ODczMDg1NmE3OGQ0ZmJlMjVmMTc4MGRlZDllOTU3Yjc3ZDZmMDQ5OGJkMGI3MzEyNDEyZjljNjk3MWI4ODAxMGM0ZGU547DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=; _abck=5C8EB99A49DEC2DE44F9F5ABAC634C37~0~YAAQNRreF42k/ZyaAQAAr9cZsg7RhLx8oNif9ejndvnbJAviuZiHtH8NKHPKZX1Vf3/MiiNIdqrAsZQ4AJrWNuZmFSq1u2dk8M5NOzpW/SXsy0mHPrse9HgOD9ga3TOCwFnFXjIngllQZzWYL0NerSuHD7uyFCH7ffAM5RrzxBxEoB+w99Zw/jas+61YdxhtRkgu7EDiwuZA6cksIsWWqIuDhqQjFtEFrZhLixrXAPmbhcBUNY2ykj62u3FgdE+B9mZ7Z02V00pTLtHjo7LT1WQUKN4npulQD+umTQVChJUd9gVpMYb69AvWOjW3yVbkvGJUjHdocOIaL4QCx1ydiBtqyyTHnvS4P7PnZgPcGNzlppVfGPDXYi19H2FdY+A/WsuScfTahxUH6T8JWY2Km58fuIJjYnyiLzUfjmxxmmkiLAEBktCrLsZxqZ7OzFDYR9FAUPGQgCszYyM7gULxRWZL9MGconCOF9Ku/fczG7XT+I3v7vZ12lekRqjlAPxBX+xGoUDSiHvNH71R31frhqCp46LZZ7bL6a51+IADYMkJO4Ysn6OlM72neka6Fv9gohmT3Sm0E69zy4Yl+w5If8bL0QFo0clC9TkQB/3r1H9PPA4dDyfXzr2i6LCSxReUYoCUprc2U+Lma1pdmcLFd3UQbpQWJmI+1ku0v11IvR6lruXB32cIBzSVT9kL/DR3mzJBa3zh+gKRxDoxyBe1qQMAwTVG9lMynYDZE2CwFg/ij44niD8yRiBte07LnvcuwkmDUVesvK1n5Ms2um1oSdG3egULVAyCiaCT2tJlwn4yBu4PAyFzQ0CdAvkgBJbpSdsPeWYE2NdZ0uLUi3ooZawgxG3i69Wp/0Sp3qQc~-1~-1~-1~AAQAAAAE%2f%2f%2f%2f%2f0YgjJpO+sn8UGQLYm0YiVTZPZwKplnp5Yz2bhoyOVrl+ydogoijEkBu6XuLVZrSpl6b7LT01BMnTyIFsElbKAAu9OVNRmEPeC+f~-1; _ga_70947XW48P=GS2.1.s1763924663$o10$g0$t1763924663$j60$l0$h0; _ga=GA1.1.1191974235.1749630163; tt_ticket_guard_client_data=eyJ0dC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwidHQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJ0dC10aWNrZXQtZ3VhcmQtc2NlbmUiOiJ0dF9zZWxsZXIiLCJ0dC10aWNrZXQtZ3VhcmQtb3JpZ2luLWNyeXB0Ijoie1wiZWNfcHJpdmF0ZUtleVwiOlwiLS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tXFxuTUlHSEFnRUFNQk1HQnlxR1NNNDlBZ0VHQ0NxR1NNNDlBd0VIQkcwd2F3SUJBUVFnWmxlaXVRS2Yxd0FjOGtCM1VmSE50SUFlb280VzRmdTFxbzJEZVl4Z3JaT2hSQU5DQUFTYWZPdkNRd3M0NkpYcml6VFh1bGQ0WDFzRklnSGJ4Z3ZnSGhTaElUVHovQ1EzaHVyVytoQS9IbTA3VXllQUoxcGNDWmVXeWFwTndMOFozVndoMnNUclxcbi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS1cIixcImVjX3B1YmxpY0tleVwiOlwiLS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS1cXG5NRmt3RXdZSEtvWkl6ajBDQVFZSUtvWkl6ajBEQVFjRFFnQUVtbnpyd2tNTE9PaVY2NHMwMTdwWGVGOWJCU0lCMjhZTDRCNFVvU0UwOC93a040YnExdm9RUHg1dE8xTW5nQ2RhWEFtWGxzbXFUY0MvR2QxY0lkckU2dz09XFxuLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tXCIsXCJlY19jc3JcIjpcIlwifSIsInR0LXRpY2tldC1ndWFyZC1wdWJsaWMta2V5IjoiQkpwODY4SkRDempvbGV1TE5OZTZWM2hmV3dVaUFkdkdDK0FlRktFaE5QUDhKRGVHNnRiNkVEOGViVHRUSjRBbldsd0psNWJKcWszQXZ4bmRYQ0hheE9zPSIsInR0LXRpY2tldC1ndWFyZC13ZWItdmVyc2lvbiI6MX0%3D; ttcsid=1764582328351::nb2s4lV-HxxeRCD94WQt.17.1764582454150.0; ttcsid_CMSS13RC77U1PJEFQUB0=1764582328350::MrmAD5jAidaD8seOnJsH.11.1764582454151.0; sso_uid_tt=b0d7397f52b3f90a579fceb2924319f7838b7bd72d1642ba746b420a19906269; sso_uid_tt_ss=b0d7397f52b3f90a579fceb2924319f7838b7bd72d1642ba746b420a19906269; toutiao_sso_user=bca26afded7d1eb45df10ee84f60c90e; toutiao_sso_user_ss=bca26afded7d1eb45df10ee84f60c90e; sid_ucp_sso_v1=1.0.1-KDhjMDFmMzM3NGEzNTgzNzliMTIyMjEzODZhMzc5YzJiMjM5NjdjMWYKIgiHiMuAgtf8kmcQuMi1yQYY5B8gDDCi6Ze5BjgBQOsHSAYQAxoGbWFsaXZhIiBiY2EyNmFmZGVkN2QxZWI0NWRmMTBlZTg0ZjYwYzkwZTJOCiCdyTSydDABMCR-unziS6bbgNwJx57aLiZAxcVXcJqQChIg3X1uAuqCOb3f3VfUWREYnvHfIFbifn0mfHRHiX9sp5MYAyIGdGlrdG9r; ssid_ucp_sso_v1=1.0.1-KDhjMDFmMzM3NGEzNTgzNzliMTIyMjEzODZhMzc5YzJiMjM5NjdjMWYKIgiHiMuAgtf8kmcQuMi1yQYY5B8gDDCi6Ze5BjgBQOsHSAYQAxoGbWFsaXZhIiBiY2EyNmFmZGVkN2QxZWI0NWRmMTBlZTg0ZjYwYzkwZTJOCiCdyTSydDABMCR-unziS6bbgNwJx57aLiZAxcVXcJqQChIg3X1uAuqCOb3f3VfUWREYnvHfIFbifn0mfHRHiX9sp5MYAyIGdGlrdG9r; _ga_BZBQ2QHQSP=GS2.1.s1764582328$o12$g1$t1764582456$j60$l0$h1780784786; tt_ticket_guard_server_data=eyJ0aWNrZXQiOiI4NDAyNzEzMGIwY2Y1ZmQ5YjIzODBkYTMyZWU5NjZmYiIsInRzX3NpZ24iOiJ0cy4xLjNjYjIwYWZiYzNmOGMzMjc2YzU5OTkwMGE4YTQ3ZDE1OGVkYmRlOWI2NWY2MGQ2ZTUxY2E5NTgyNGU2MzY4YTgwZTcwYjRiZGE4MmMxMzgzNmU1Y2ZhMTgzOTRkNzAyNDBmOGFmMTYzMWYxNjVhZTk2MDEyMmVlZmZkNDUzM2RkIn0%3D; tt_ticket_guard_web_domain=2; sid_guard=84027130b0cf5fd9b2380da32ee966fb%7C1764582457%7C259199%7CThu%2C+04-Dec-2025+09%3A47%3A36+GMT; uid_tt=22ea797a8cdbf9e2f68fe012f17a681b1af9537b28407cae92277d0d186f9f01; uid_tt_ss=22ea797a8cdbf9e2f68fe012f17a681b1af9537b28407cae92277d0d186f9f01; sid_tt=84027130b0cf5fd9b2380da32ee966fb; sessionid=84027130b0cf5fd9b2380da32ee966fb; sessionid_ss=84027130b0cf5fd9b2380da32ee966fb; tt_session_tlb_tag=sttt%7C2%7ChAJxMLDPX9myOA2jLulm-__________Z0rbOJ8eN1ZQnFGrUWj88LkGi_OAzgMWYjXI-7a9tXG4%3D; sid_ucp_v1=1.0.1-KDI2NTQyZDNkYTgzM2VjMGNkZTViZDdiYmZhYTAyM2RiMzA5MDIzODEKHAiHiMuAgtf8kmcQuci1yQYY5B8gDDgBQOsHSAQQAxoDbXkyIiA4NDAyNzEzMGIwY2Y1ZmQ5YjIzODBkYTMyZWU5NjZmYjJOCiBMLYhtA3JHhO8I1kpGALeCL_vRMMIJB6hlZbta_mTblRIgV17JYk27VzJrxFW_7eK_lKBYcKGs0B-sXd7OOuvAP1EYASIGdGlrdG9r; ssid_ucp_v1=1.0.1-KDI2NTQyZDNkYTgzM2VjMGNkZTViZDdiYmZhYTAyM2RiMzA5MDIzODEKHAiHiMuAgtf8kmcQuci1yQYY5B8gDDgBQOsHSAQQAxoDbXkyIiA4NDAyNzEzMGIwY2Y1ZmQ5YjIzODBkYTMyZWU5NjZmYjJOCiBMLYhtA3JHhO8I1kpGALeCL_vRMMIJB6hlZbta_mTblRIgV17JYk27VzJrxFW_7eK_lKBYcKGs0B-sXd7OOuvAP1EYASIGdGlrdG9r; msToken=Fa3y3zeKPFVgX3cQvyfdrfBdF0OqQ8NvLt7wOCWFvHb0l3vhk6PUsbluAH5bU-mgrllDAPuUCWrR8U58QuIUSIEkImwcGRsNCFzTGoXwLu5w8_J04gOYJ73QLeihMXXLL2_Cf8qw; global_seller_id_unified_seller_env=7494930113907558878; app_id_unified_seller_env=4068; oec_seller_id_unified_seller_env=7494930113907558878; SELLER_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjc0MzI2MTM2MzI2NzA4NzY2NzksIk9lY1VpZCI6NzQ5NTk3OTY5NDUzOTU3Mzk0NCwiT2VjU2hvcElkIjo3NDk0OTMwMTEzOTA3NTU4ODc4LCJTaG9wUmVnaW9uIjoiIiwiR2xvYmFsU2VsbGVySWQiOjc0OTQ5MzAxMTM5MDc1NTg4NzgsIlNlbGxlcklkIjo3NDk0OTMwMTEzOTA3NTU4ODc4LCJleHAiOjE3NjQ2Njg4NzUsIm5iZiI6MTc2NDU4MTQ3NX0.DBmfD9gukr0bxMHMlUf0O-soMJ3vgieEOroLGYQCi80; ttwid=1%7CDmzLYDAMXkwdyXc7CqNnNDRg7BhO108hrXcl57YhkHo%7C1764657626%7Ca983d45da251a581fd86068ace8ad7b624d54d1cfa15ef323595b6966fe8a8bc; msToken=D5ggzCpJvwRbyofW_yNs0TWd6uDMB7g6vKMak-Wtne-_jg0MgB--eYMmuWF_4sWgkQlf0YWoliQq6WA6TPA4HCg7VRZ1eQI2gZiS_GeB1-tUfZ8EAO0Yx7oc6CKZdeYBPujrOl_R; gd_random=eyJtYXRjaCI6dHJ1ZSwicGVyY2VudCI6MC45OTUxODg2MjU3NzM0NjMyfQ==.LmQawaak9p1AHtpXoLh5gVVFVDGUypp+3J2Z0/I6Y4Y=; _dd_s=logs=1&id=f0b7039f-10ae-43c9-9717-5b6142a85ed5&created=1764657621451&expire=1764658667482; odin_tt=c6a3c2830c5c95741c2d838535036c6d1664b78c1853ba3e8cf5068e6ecb90b8d55156ac416485e0edbc9bed6b7b6f0b; user_oec_info=0a5303917600b7f9e168333764f67704da0257d2bbdbb8cf217f55ec8458809107028cd142b4b0d5721f07e26c31acbc5a87e12abe30af8f6ab95a80999f31476b48ce97061e3a1412ab7a8ad267750598f10893701a490a3c000000000000000000004fc822bb7af4954d5179925edc6f388c4bad8adb28eddb51fa3618b2a42ad244b4b309045b3296010d47c914eb28f2f554d910dc8a830e1886d2f6f20d220104d6a75562",
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();
      console.log(data);

      // Save ke Prisma
      await prisma.salesStats.create({
        data: {
          id: crypto.randomUUID(),
          roomId: ROOM_MAP[roomId],
          stats: data,
          syncTime: getJakartaTime()
        },
      });

    }

    return NextResponse.json({
      success: true,
      message: "Cron sales has been success",
    });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : JSON.stringify(error),
      },
      { status: 500 }
    );
  }
}
