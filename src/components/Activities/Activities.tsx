import fetch from "isomorphic-unfetch";
import { Container, ListGroup, Alert } from "react-bootstrap";
import { Component, CSSProperties } from "react";
import { Activity } from "./Activity";

interface IProps {
    page?: number;
    perPage?: number;
    /**
     * Defines the class of the activities.
     */
    className?: string;
    /**
     * Defines the style of the activities.
     */
    style?: CSSProperties;
}

interface IState {
    activities: any[];
}

const { activities } = {
    activities: [
        {
            resource_state: 2,
            athlete: {
                id: 13834264,
                resource_state: 1
            },
            name: "Morning Run",
            distance: 8756.5,
            moving_time: 3541,
            elapsed_time: 3556,
            total_elevation_gain: 47.7,
            type: "Run",
            workout_type: null,
            id: 3200452732,
            external_id: "garmin_push_4676411775",
            upload_id: 3421569135,
            start_date: "2020-03-20T11:39:42Z",
            start_date_local: "2020-03-20T07:39:42Z",
            timezone: "(GMT-05:00) America/Toronto",
            utc_offset: -14400,
            start_latlng: [43.725975, -79.730897],
            end_latlng: [43.726713, -79.730336],
            location_city: null,
            location_state: null,
            location_country: "Canada",
            achievement_count: 0,
            kudos_count: 0,
            comment_count: 0,
            athlete_count: 1,
            photo_count: 0,
            map: {
                id: "a3200452732",
                summary_polyline:
                    "ikziGl|qeNC_AJs@f@sADo@Qg@Ua@@WAo@}@s@c@m@a@e@e@]iAgByCmDWa@OKy@Yy@k@WEe@HQLkAdBaAhAu@dAg@z@k@l@Y`@YpAa@\\g@bA_@lA[^IBUEc@Rq@l@e@l@a@bAQp@Uh@q@b@S\\]v@y@lAYh@Ap@Jt@Nb@bAfAd@VvDnE`BrAd@ZHj@m@fABNBt@Eh@@r@Cp@i@jBa@RUC_@VUh@_@Lq@`@M?[Cc@f@CZJj@?NNj@r@jB[tDWxBc@PWb@EP?j@En@QvAG`BUj@UZc@z@EJ@\\Kj@a@RU^_@\\Sj@A\\RnAAl@Mf@EHUXYTYf@Qb@Yb@cAp@a@vA]^a@EGEc@@e@VGJu@rB_@b@oAx@s@YgDeAY\\u@pDO`A_@~A}@xCX`@bBnA|@j@ZNzB~AJ@h@sBFo@NYv@eAPWJo@?]OgB_@{ASg@Qm@CORe@|@]Xe@TaAVi@NQVMl@DRDd@]`@eB^YPE`@Y\\o@No@^YHA\\c@Ls@Bs@M_BFu@PS`Au@Xk@Ag@z@gAJWP_AF}@LsB?aAJm@RUf@GZHd@ZTFb@Pj@f@d@r@x@l@lA`Bh@l@^XbAdAZ?\\c@h@gAT_@lAiC~@eBTi@Xe@`@M`@RlAb@z@^fARd@CJMFSz@_DpAgEd@aBRi@RwAjA}Bj@}@dAsBr@kARw@pByDhAcCNm@GMQS{@s@",
                resource_state: 2
            },
            trainer: false,
            commute: false,
            manual: false,
            private: true,
            visibility: "only_me",
            flagged: false,
            gear_id: null,
            from_accepted_tag: false,
            upload_id_str: "3421569135",
            average_speed: 2.473,
            max_speed: 4.2,
            has_heartrate: true,
            average_heartrate: 167.6,
            max_heartrate: 187,
            heartrate_opt_out: false,
            display_hide_heartrate_option: true,
            elev_high: 231.4,
            elev_low: 208.5,
            pr_count: 0,
            total_photo_count: 0,
            has_kudoed: false
        },
        {
            resource_state: 2,
            athlete: {
                id: 13834264,
                resource_state: 1
            },
            name: "Morning Run",
            distance: 5324.5,
            moving_time: 2097,
            elapsed_time: 2100,
            total_elevation_gain: 28.2,
            type: "Run",
            workout_type: null,
            id: 3200452699,
            external_id: "garmin_push_4676411756",
            upload_id: 3421569107,
            start_date: "2020-03-18T11:19:15Z",
            start_date_local: "2020-03-18T07:19:15Z",
            timezone: "(GMT-05:00) America/Toronto",
            utc_offset: -14400,
            start_latlng: [43.725916, -79.730924],
            end_latlng: [43.725911, -79.730762],
            location_city: null,
            location_state: null,
            location_country: "Canada",
            achievement_count: 0,
            kudos_count: 0,
            comment_count: 0,
            athlete_count: 1,
            photo_count: 0,
            map: {
                id: "a3200452699",
                summary_polyline:
                    "ke|iGd|teNUf@Md@Wr@e@@c@Kc@T]f@i@~A_@Zu@d@QN]?UGi@Si@Ys@Ym@S{@MwAYa@Mk@I_@Cy@dA_@~AOb@}AtBHf@Ej@Ub@sFfGCj@V`@Hp@QdASl@En@DNp@~@l@VJf@Q|@Iz@ANHp@`@Jf@GX@jBh@ZBz@CPb@DZXb@jBdB`BfBPLLl@Vf@z@b@^`@h@rBVf@Vc@?E?u@M}@?q@B[Vk@TQf@Gb@WF[EgAGc@Oo@So@i@gAUk@AU@Ub@uCHiBXm@BKQsBGcBDi@Pi@z@eAR]H{@MmBIg@Om@Ym@Ww@Jm@ZY`@O\\c@b@}AJQj@e@d@DTJ^YNWZoAPS",
                resource_state: 2
            },
            trainer: false,
            commute: false,
            manual: false,
            private: true,
            visibility: "only_me",
            flagged: false,
            gear_id: null,
            from_accepted_tag: false,
            upload_id_str: "3421569107",
            average_speed: 2.539,
            max_speed: 3.7,
            has_heartrate: true,
            average_heartrate: 165.9,
            max_heartrate: 181,
            heartrate_opt_out: false,
            display_hide_heartrate_option: true,
            elev_high: 239,
            elev_low: 215.2,
            pr_count: 0,
            total_photo_count: 0,
            has_kudoed: false
        },
        {
            resource_state: 2,
            athlete: {
                id: 13834264,
                resource_state: 1
            },
            name: "Morning Run",
            distance: 5983.1,
            moving_time: 2364,
            elapsed_time: 2364,
            total_elevation_gain: 32.5,
            type: "Run",
            workout_type: null,
            id: 3200452651,
            external_id: "garmin_push_4676411726",
            upload_id: 3421569073,
            start_date: "2020-03-16T12:53:20Z",
            start_date_local: "2020-03-16T08:53:20Z",
            timezone: "(GMT-05:00) America/Toronto",
            utc_offset: -14400,
            start_latlng: [43.725952, -79.730959],
            end_latlng: [43.726735, -79.73033],
            location_city: null,
            location_state: null,
            location_country: "Canada",
            achievement_count: 0,
            kudos_count: 0,
            comment_count: 0,
            athlete_count: 1,
            photo_count: 0,
            map: {
                id: "a3200452651",
                summary_polyline:
                    "ikziGj{qeN?UFo@Rs@Vi@Fw@[a@Me@BWGk@MIc@SQQ_@m@_A}@]c@s@qAmBsBeA{AsAm@_@YWMKAa@J_@^sAnB}AlBo@hAs@z@Q\\Kj@Wb@c@XWd@e@vAYb@OBUCUFgAbAYf@]t@_@xAWX_@LOLk@rAsApBMJ_@Hc@Xo@|@q@x@SZs@vA_ArA_@l@{@fAc@v@w@`Ac@t@kAvAcHnKKPD\\xA~A",
                resource_state: 2
            },
            trainer: false,
            commute: false,
            manual: false,
            private: true,
            visibility: "only_me",
            flagged: false,
            gear_id: null,
            from_accepted_tag: false,
            upload_id_str: "3421569073",
            average_speed: 2.531,
            max_speed: 4.5,
            has_heartrate: true,
            average_heartrate: 168.3,
            max_heartrate: 180,
            heartrate_opt_out: false,
            display_hide_heartrate_option: true,
            elev_high: 231.4,
            elev_low: 208.5,
            pr_count: 0,
            total_photo_count: 0,
            has_kudoed: false
        },
        {
            resource_state: 2,
            athlete: {
                id: 13834264,
                resource_state: 1
            },
            name: "Morning Run",
            distance: 5523.6,
            moving_time: 2250,
            elapsed_time: 2322,
            total_elevation_gain: 31.2,
            type: "Run",
            workout_type: null,
            id: 3200452652,
            external_id: "garmin_push_4676411698",
            upload_id: 3421569053,
            start_date: "2020-03-14T11:16:59Z",
            start_date_local: "2020-03-14T07:16:59Z",
            timezone: "(GMT-05:00) America/Toronto",
            utc_offset: -14400,
            start_latlng: [43.725919, -79.73087],
            end_latlng: [43.725654, -79.730618],
            location_city: null,
            location_state: null,
            location_country: "Canada",
            achievement_count: 0,
            kudos_count: 0,
            comment_count: 0,
            athlete_count: 1,
            photo_count: 0,
            map: {
                id: "a3200452652",
                summary_polyline:
                    "ij{iG`oqeN\\YX_@T_Ax@{@j@cAzAkBhBoC^]\\@LF`@\\f@Vr@Vt@`AdCpCn@lAZ`@dA`Aj@r@`@X\\\\Il@Hl@LFNf@Cb@m@|AGj@?\\Kn@q@`Au@~@wBfC_@Z]Jc@?e@Fy@fB_@`@u@b@cBZe@T]^gAbBiAxA]^a@VQD]@wAM]_@WOiA_AoBuB{AiBOO_@OUSu@y@wAaB}@tAo@x@mCjE}FjIeAdBw@jAwAnBuBbDJf@x@|@",
                resource_state: 2
            },
            trainer: false,
            commute: false,
            manual: false,
            private: true,
            visibility: "only_me",
            flagged: false,
            gear_id: null,
            from_accepted_tag: false,
            upload_id_str: "3421569053",
            average_speed: 2.455,
            max_speed: 4.6,
            has_heartrate: false,
            heartrate_opt_out: false,
            display_hide_heartrate_option: false,
            elev_high: 231.4,
            elev_low: 208.5,
            pr_count: 0,
            total_photo_count: 0,
            has_kudoed: false
        },
        {
            resource_state: 2,
            athlete: {
                id: 13834264,
                resource_state: 1
            },
            name: "Morning Run",
            distance: 4886.7,
            moving_time: 1951,
            elapsed_time: 1987,
            total_elevation_gain: 27.5,
            type: "Run",
            workout_type: null,
            id: 3200452657,
            external_id: "garmin_push_4676411674",
            upload_id: 3421569030,
            start_date: "2020-03-12T13:00:35Z",
            start_date_local: "2020-03-12T09:00:35Z",
            timezone: "(GMT-05:00) America/Toronto",
            utc_offset: -14400,
            start_latlng: [43.726022, -79.731006],
            end_latlng: [43.725717, -79.730555],
            location_city: null,
            location_state: null,
            location_country: "Canada",
            achievement_count: 0,
            kudos_count: 0,
            comment_count: 0,
            athlete_count: 1,
            photo_count: 0,
            map: {
                id: "a3200452657",
                summary_polyline:
                    "ikziGb|qeNAw@BSNq@Xi@Jq@Go@YUBu@Ii@gA}@y@eA_@]w@aAWg@S[{@gAo@o@u@eA{Au@i@a@e@Bq@p@]`@u@hAa@`@{@dAq@lAw@`AINS|@y@z@Yf@_@tA[^e@Ea@Rq@l@[`@i@lA]pA[\\YL[^i@lAcAvA[X_@H[TW^_ArAkApBiCpDcA~AgB`CqAvBa@f@kD`Fu@lAKj@zAlB",
                resource_state: 2
            },
            trainer: false,
            commute: false,
            manual: false,
            private: true,
            visibility: "only_me",
            flagged: false,
            gear_id: null,
            from_accepted_tag: false,
            upload_id_str: "3421569030",
            average_speed: 2.505,
            max_speed: 3.5,
            has_heartrate: true,
            average_heartrate: 169,
            max_heartrate: 179,
            heartrate_opt_out: false,
            display_hide_heartrate_option: true,
            elev_high: 231.4,
            elev_low: 208.6,
            pr_count: 0,
            total_photo_count: 0,
            has_kudoed: false
        },
        {
            resource_state: 2,
            athlete: {
                id: 13834264,
                resource_state: 1
            },
            name: "Morning Run",
            distance: 4170.7,
            moving_time: 1587,
            elapsed_time: 1587,
            total_elevation_gain: 25.9,
            type: "Run",
            workout_type: null,
            id: 3171195604,
            external_id: "garmin_push_4640668316",
            upload_id: 3389532081,
            start_date: "2020-03-09T11:55:19Z",
            start_date_local: "2020-03-09T07:55:19Z",
            timezone: "(GMT-05:00) America/Toronto",
            utc_offset: -14400,
            start_latlng: [43.726017, -79.731014],
            end_latlng: [43.725615, -79.730676],
            location_city: null,
            location_state: null,
            location_country: "Canada",
            achievement_count: 0,
            kudos_count: 0,
            comment_count: 0,
            athlete_count: 1,
            photo_count: 0,
            map: {
                id: "a3171195604",
                summary_polyline:
                    "yj{iGzoqeN`@k@`@SVkAV_@ZWl@cAvDoFd@g@ZMb@L^XzAn@jA|AvB`Cf@fA\\^hBpBn@d@Lf@Ct@RRRLBNCr@IXYh@Kb@ApA",
                resource_state: 2
            },
            trainer: false,
            commute: false,
            manual: false,
            private: true,
            visibility: "only_me",
            flagged: false,
            gear_id: null,
            from_accepted_tag: false,
            upload_id_str: "3389532081",
            average_speed: 2.628,
            max_speed: 3.4,
            has_heartrate: true,
            average_heartrate: 169.2,
            max_heartrate: 181,
            heartrate_opt_out: false,
            display_hide_heartrate_option: true,
            elev_high: 231.4,
            elev_low: 209,
            pr_count: 0,
            total_photo_count: 0,
            has_kudoed: false
        },
        {
            resource_state: 2,
            athlete: {
                id: 13834264,
                resource_state: 1
            },
            name: "Lunch Run",
            distance: 4633.2,
            moving_time: 1756,
            elapsed_time: 1756,
            total_elevation_gain: 18.5,
            type: "Run",
            workout_type: null,
            id: 3163375018,
            external_id: "garmin_push_4630716101",
            upload_id: 3380835779,
            start_date: "2020-03-07T16:33:30Z",
            start_date_local: "2020-03-07T11:33:30Z",
            timezone: "(GMT-05:00) America/Toronto",
            utc_offset: -18000,
            start_latlng: [43.725968, -79.730927],
            end_latlng: [43.725939, -79.730778],
            location_city: null,
            location_state: null,
            location_country: "Canada",
            achievement_count: 0,
            kudos_count: 0,
            comment_count: 0,
            athlete_count: 1,
            photo_count: 0,
            map: {
                id: "a3163375018",
                summary_polyline:
                    "gkziG`{qeN@s@Lo@JYLKNk@Cq@[QEg@?w@{@o@{@aA_A{@eAcBiCyCk@w@c@UYI_@S_@[c@K_@RUVqAlB}ArBi@~@w@~@Uj@Mh@{@|@Wb@GP[lAa@Ze@GWPo@j@m@z@]v@ENUdA]Za@X{@|AwAnBk@Lg@h@}F`JgAtAaCjDeAbBwAnBoAlBcA`Bq@`AEHJXzAfB",
                resource_state: 2
            },
            trainer: false,
            commute: false,
            manual: false,
            private: true,
            visibility: "only_me",
            flagged: false,
            gear_id: null,
            from_accepted_tag: false,
            upload_id_str: "3380835779",
            average_speed: 2.638,
            max_speed: 3.8,
            has_heartrate: false,
            heartrate_opt_out: false,
            display_hide_heartrate_option: false,
            elev_high: 223.2,
            elev_low: 208.9,
            pr_count: 0,
            total_photo_count: 0,
            has_kudoed: false
        },
        {
            resource_state: 2,
            athlete: {
                id: 13834264,
                resource_state: 1
            },
            name: "Morning Run",
            distance: 3568.4,
            moving_time: 1580,
            elapsed_time: 1580,
            total_elevation_gain: 19.2,
            type: "Run",
            workout_type: null,
            id: 3163374938,
            external_id: "garmin_push_4630716089",
            upload_id: 3380835769,
            start_date: "2020-03-05T12:23:14Z",
            start_date_local: "2020-03-05T07:23:14Z",
            timezone: "(GMT-05:00) America/Toronto",
            utc_offset: -18000,
            start_latlng: [43.725917, -79.730918],
            end_latlng: [43.725719, -79.730576],
            location_city: null,
            location_state: null,
            location_country: "Canada",
            achievement_count: 0,
            kudos_count: 0,
            comment_count: 0,
            athlete_count: 1,
            photo_count: 0,
            map: {
                id: "a3163374938",
                summary_polyline:
                    "akziGr{qeNEm@Fq@Tm@^i@?OCs@a@WAu@Ek@}@o@]a@yAuAgAoBm@i@yAaBc@m@MKm@UcAo@e@ME@_@XuAvBqBbCe@`Ao@n@Uh@Ip@Y^SFW^",
                resource_state: 2
            },
            trainer: false,
            commute: false,
            manual: false,
            private: true,
            visibility: "only_me",
            flagged: false,
            gear_id: null,
            from_accepted_tag: false,
            upload_id_str: "3380835769",
            average_speed: 2.258,
            max_speed: 2.8,
            has_heartrate: false,
            heartrate_opt_out: false,
            display_hide_heartrate_option: false,
            elev_high: 224.8,
            elev_low: 208.9,
            pr_count: 0,
            total_photo_count: 0,
            has_kudoed: false
        },
        {
            resource_state: 2,
            athlete: {
                id: 13834264,
                resource_state: 1
            },
            name: "Morning Run",
            distance: 7301.9,
            moving_time: 2808,
            elapsed_time: 2819,
            total_elevation_gain: 38,
            type: "Run",
            workout_type: null,
            id: 3163374946,
            external_id: "garmin_push_4630716080",
            upload_id: 3380835758,
            start_date: "2020-03-02T12:51:37Z",
            start_date_local: "2020-03-02T07:51:37Z",
            timezone: "(GMT-05:00) America/Toronto",
            utc_offset: -18000,
            start_latlng: [43.725935, -79.730819],
            end_latlng: [43.726875, -79.730079],
            location_city: null,
            location_state: null,
            location_country: "Canada",
            achievement_count: 0,
            kudos_count: 0,
            comment_count: 0,
            athlete_count: 1,
            photo_count: 0,
            map: {
                id: "a3163374946",
                summary_polyline:
                    "sj{iGfoqeNZa@^UViAz@cAr@iAjBaCbAwA`@g@FCd@@j@\\bBt@Zf@nCzCXf@^t@jCpCt@h@Dh@Cr@JLRHLb@?RGj@SNQ^IXAp@@n@Sj@yA`BOLcBnBy@n@GBe@Fg@?]Zm@zAm@l@c@Ro@P_@D_@He@Z[^{AxBk@l@c@l@SNID_@FuAK[N[x@Mj@APFl@Af@DTEp@c@~AYl@g@?WNSf@y@l@[Jm@IY^If@Fv@r@xAT`AKp@A\\a@|DLh@RH~ArAl@v@^`@`@XnBhCvAtA\\`@^YZa@xBoEx@iBj@{A`@k@b@Dp@`@`At@fBl@NBL?`@WlAcFXy@jBgGBq@La@vCiFn@qAd@u@\\gAN]dB_D~@sBHu@[[yB}AkCcCIC}@cAqAoBYm@@m@Ik@\\SJm@As@Ju@n@oAAo@_@]Gk@F_@Wc@y@q@m@s@mAoAYo@o@eAqB{Bi@s@OKc@Oa@Se@[e@K[P]`@}AzByAbBc@t@{@fAMn@EVUd@a@T",
                resource_state: 2
            },
            trainer: false,
            commute: false,
            manual: false,
            private: true,
            visibility: "only_me",
            flagged: false,
            gear_id: null,
            from_accepted_tag: false,
            upload_id_str: "3380835758",
            average_speed: 2.6,
            max_speed: 3.9,
            has_heartrate: true,
            average_heartrate: 177.2,
            max_heartrate: 192,
            heartrate_opt_out: false,
            display_hide_heartrate_option: true,
            elev_high: 231.4,
            elev_low: 208.9,
            pr_count: 0,
            total_photo_count: 0,
            has_kudoed: false
        },
        {
            resource_state: 2,
            athlete: {
                id: 13834264,
                resource_state: 1
            },
            name: "Morning Run",
            distance: 5373.3,
            moving_time: 2017,
            elapsed_time: 2123,
            total_elevation_gain: 25.1,
            type: "Run",
            workout_type: null,
            id: 3163374930,
            external_id: "garmin_push_4630716064",
            upload_id: 3380835734,
            start_date: "2020-02-24T12:20:03Z",
            start_date_local: "2020-02-24T07:20:03Z",
            timezone: "(GMT-05:00) America/Toronto",
            utc_offset: -18000,
            start_latlng: [43.725893, -79.730882],
            end_latlng: [43.726382, -79.730565],
            location_city: null,
            location_state: null,
            location_country: "Canada",
            achievement_count: 0,
            kudos_count: 0,
            comment_count: 0,
            athlete_count: 1,
            photo_count: 0,
            map: {
                id: "a3163374930",
                summary_polyline:
                    "}jziGn{qeNEq@ASDWRo@XUDs@Oi@Wa@B]Em@q@_@][]c@_Ay@UWm@qAoBqB}@sAMO]Qg@Qw@e@a@OUB]\\g@v@w@hA_@^Yd@_@^}@|Am@r@YrAg@`@c@r@g@vA]b@]Aa@Pa@f@]ZcAtBU~@_Ar@OXWv@kAbB_@^UBg@R{@nASRYb@mAnBqA`BWd@o@|@MR_@d@s@hA{CfEk@dAgExGAH`@\\x@`A",
                resource_state: 2
            },
            trainer: false,
            commute: false,
            manual: false,
            private: true,
            visibility: "only_me",
            flagged: false,
            gear_id: null,
            from_accepted_tag: false,
            upload_id_str: "3380835734",
            average_speed: 2.664,
            max_speed: 4,
            has_heartrate: false,
            heartrate_opt_out: false,
            display_hide_heartrate_option: false,
            elev_high: 223.2,
            elev_low: 209,
            pr_count: 0,
            total_photo_count: 0,
            has_kudoed: false
        }
    ]
};
export class Activities extends Component<IProps, IState> {
    private page: number;
    private perPage: number;

    constructor(props: IProps) {
        super(props);
        this.page = props.page;
        this.perPage = props.perPage;
        this.state = { activities: [] };
    }

    public async componentDidMount() {
        // const response = await fetch(
        //     `/api/activities?page=${this.page}&perPage=${this.perPage}`
        // );
        // if (response.ok) {
        //     const data = await response.json();
        //     const { activities } = data;
        //     console.log(activities);
        //     this.setState({ activities });
        // }
    }

    public render() {
        // const { activities } = this.state;

        return (
            <ListGroup
                className={this.props.className}
                style={this.props.style}
                variant="flush"
            >
                {activities.map((activity) => (
                    <Activity activity={activity} />
                ))}
            </ListGroup>
        );
    }
}
