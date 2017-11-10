/**
 * Created by shawn-liu on 17/11/10.
 */
const filterResults = require('../../../src/lib/filterResults');

const list = [
    {
        "hits": [],
        "fastaHeader": "909137",
        "Score": "39.3",
        "Expect": "1e-05",
        "Method": "Compositional matrix adjust.",
        "Identities": "19/19",
        "Positives": "19/19",
        "Gaps": "0/19"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQTRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQTRC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQTRC",
                "subjectEnd": 19
            }
        ],
        "fastaHeader": "1361092",
        "Score": "39.7",
        "Expect": "8e-05",
        "Method": "Composition-based stats.",
        "Identities": "19/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "909131",
        "Score": "37.0",
        "Expect": "9e-05",
        "Method": "Compositional matrix adjust.",
        "Identities": "17/19",
        "Positives": "19/19",
        "Gaps": "0/19"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQTRC",
                "queryEnd": 19,
                "matched": "M++SAQFLGLLLLCFQTRC",
                "subjectStart": 1,
                "subjectString": "MIASAQFLGLLLLCFQTRC",
                "subjectEnd": 19
            }
        ],
        "fastaHeader": "909136",
        "Score": "37.0",
        "Expect": "1e-04",
        "Method": "Compositional matrix adjust.",
        "Identities": "18/18",
        "Positives": "18/18",
        "Gaps": "0/18"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQTR",
                "queryEnd": 18,
                "matched": "MMSSAQFLGLLLLCFQTR",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQTR",
                "subjectEnd": 18
            }
        ],
        "fastaHeader": "1493404",
        "Score": "39.3",
        "Expect": "1e-04",
        "Method": "Composition-based stats.",
        "Identities": "19/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "1360813",
        "Score": "38.5",
        "Expect": "2e-04",
        "Method": "Composition-based stats.",
        "Identities": "19/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "801984",
        "Score": "38.5",
        "Expect": "2e-04",
        "Method": "Composition-based stats.",
        "Identities": "19/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "972275",
        "Score": "37.7",
        "Expect": "4e-04",
        "Method": "Composition-based stats.",
        "Identities": "18/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "M+SSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MVSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "1563816",
        "Score": "36.6",
        "Expect": "7e-04",
        "Method": "Compositional matrix adjust.",
        "Identities": "19/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "1714640",
        "Score": "37.0",
        "Expect": "7e-04",
        "Method": "Compositional matrix adjust.",
        "Identities": "19/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "802058",
        "Score": "36.6",
        "Expect": "7e-04",
        "Method": "Compositional matrix adjust.",
        "Identities": "19/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "2025374",
        "Score": "36.6",
        "Expect": "7e-04",
        "Method": "Compositional matrix adjust.",
        "Identities": "19/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "801981",
        "Score": "37.0",
        "Expect": "8e-04",
        "Method": "Compositional matrix adjust.",
        "Identities": "19/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "1714637",
        "Score": "36.6",
        "Expect": "8e-04",
        "Method": "Compositional matrix adjust.",
        "Identities": "19/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "1668218",
        "Score": "37.0",
        "Expect": "8e-04",
        "Method": "Compositional matrix adjust.",
        "Identities": "19/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "801992",
        "Score": "37.0",
        "Expect": "8e-04",
        "Method": "Compositional matrix adjust.",
        "Identities": "19/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "368212",
        "Score": "36.6",
        "Expect": "8e-04",
        "Method": "Compositional matrix adjust.",
        "Identities": "19/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "801988",
        "Score": "37.0",
        "Expect": "8e-04",
        "Method": "Compositional matrix adjust.",
        "Identities": "19/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "802055",
        "Score": "36.6",
        "Expect": "8e-04",
        "Method": "Compositional matrix adjust.",
        "Identities": "19/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "801972",
        "Score": "37.0",
        "Expect": "8e-04",
        "Method": "Compositional matrix adjust.",
        "Identities": "19/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "152463",
        "Score": "36.6",
        "Expect": "9e-04",
        "Method": "Compositional matrix adjust.",
        "Identities": "19/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "11289",
        "Score": "36.2",
        "Expect": "9e-04",
        "Method": "Compositional matrix adjust.",
        "Identities": "19/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "801994",
        "Score": "37.0",
        "Expect": "9e-04",
        "Method": "Compositional matrix adjust.",
        "Identities": "19/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "155243",
        "Score": "36.2",
        "Expect": "9e-04",
        "Method": "Compositional matrix adjust.",
        "Identities": "19/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "1185675",
        "Score": "36.2",
        "Expect": "0.001",
        "Method": "Compositional matrix adjust.",
        "Identities": "19/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "802002",
        "Score": "35.8",
        "Expect": "0.002",
        "Method": "Compositional matrix adjust.",
        "Identities": "18/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ +RC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQGSRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "1523246",
        "Score": "35.0",
        "Expect": "0.003",
        "Method": "Compositional matrix adjust.",
        "Identities": "18/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ +RC",
                "subjectStart": 4,
                "subjectString": "MMSSAQFLGLLLLCFQGSRC",
                "subjectEnd": 23
            }
        ],
        "fastaHeader": "1539061",
        "Score": "35.0",
        "Expect": "0.003",
        "Method": "Compositional matrix adjust.",
        "Identities": "18/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "M+SSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MVSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "159193",
        "Score": "35.0",
        "Expect": "0.003",
        "Method": "Compositional matrix adjust.",
        "Identities": "18/20",
        "Positives": "18/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLG LLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGFLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "132598",
        "Score": "35.0",
        "Expect": "0.003",
        "Method": "Compositional matrix adjust.",
        "Identities": "18/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "M+SSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MVSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "35594",
        "Score": "34.7",
        "Expect": "0.003",
        "Method": "Compositional matrix adjust.",
        "Identities": "18/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "M+SSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MVSSAQFLGLLLLCFQVTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "1185677",
        "Score": "34.7",
        "Expect": "0.004",
        "Method": "Compositional matrix adjust.",
        "Identities": "18/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSA+FLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MMSSARFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "193946",
        "Score": "34.7",
        "Expect": "0.004",
        "Method": "Compositional matrix adjust.",
        "Identities": "18/20",
        "Positives": "18/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQT-RC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ  RC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQDIRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "223097",
        "Score": "34.7",
        "Expect": "0.004",
        "Method": "Compositional matrix adjust.",
        "Identities": "18/20",
        "Positives": "18/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQT-RC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ  RC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQDIRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "209097",
        "Score": "34.7",
        "Expect": "0.004",
        "Method": "Compositional matrix adjust.",
        "Identities": "18/20",
        "Positives": "18/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQT-RC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ  RC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQDIRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "216296",
        "Score": "34.7",
        "Expect": "0.004",
        "Method": "Compositional matrix adjust.",
        "Identities": "18/20",
        "Positives": "18/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQT-RC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ  RC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQDIRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "219468",
        "Score": "34.7",
        "Expect": "0.004",
        "Method": "Compositional matrix adjust.",
        "Identities": "18/20",
        "Positives": "18/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQT-RC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ  RC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQDIRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "194753",
        "Score": "34.3",
        "Expect": "0.005",
        "Method": "Compositional matrix adjust.",
        "Identities": "18/20",
        "Positives": "18/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQT-RC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ  RC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQDIRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "978803",
        "Score": "34.3",
        "Expect": "0.005",
        "Method": "Compositional matrix adjust.",
        "Identities": "18/19",
        "Positives": "18/19",
        "Gaps": "1/19"
    },
    {
        "hits": [
            {
                "queryStart": 2,
                "queryString": "MSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MSSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 19
            }
        ],
        "fastaHeader": "1524906",
        "Score": "34.3",
        "Expect": "0.005",
        "Method": "Compositional matrix adjust.",
        "Identities": "18/19",
        "Positives": "18/19",
        "Gaps": "1/19"
    },
    {
        "hits": [
            {
                "queryStart": 2,
                "queryString": "MSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MSSAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MSSAQFLGLLLLCFQGTRC",
                "subjectEnd": 19
            }
        ],
        "fastaHeader": "1495954",
        "Score": "34.3",
        "Expect": "0.006",
        "Method": "Compositional matrix adjust.",
        "Identities": "17/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "M++SAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MIASAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "1495950",
        "Score": "33.9",
        "Expect": "0.006",
        "Method": "Compositional matrix adjust.",
        "Identities": "17/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "M++SAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MIASAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "909070",
        "Score": "32.3",
        "Expect": "0.006",
        "Method": "Compositional matrix adjust.",
        "Identities": "16/16",
        "Positives": "16/16",
        "Gaps": "0/16"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ",
                "queryEnd": 16,
                "matched": "MMSSAQFLGLLLLCFQ",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQ",
                "subjectEnd": 16
            }
        ],
        "fastaHeader": "1495947",
        "Score": "33.9",
        "Expect": "0.007",
        "Method": "Compositional matrix adjust.",
        "Identities": "17/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "M++SAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MIASAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "1495948",
        "Score": "33.9",
        "Expect": "0.007",
        "Method": "Compositional matrix adjust.",
        "Identities": "17/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "M++SAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MIASAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "1495951",
        "Score": "33.9",
        "Expect": "0.007",
        "Method": "Compositional matrix adjust.",
        "Identities": "17/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "M++SAQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MIASAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "684089",
        "Score": "33.9",
        "Expect": "0.007",
        "Method": "Compositional matrix adjust.",
        "Identities": "18/20",
        "Positives": "18/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MMSSAQFLGLLLLCFQ  RC",
                "subjectStart": 1,
                "subjectString": "MMSSAQFLGLLLLCFQGIRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "876856",
        "Score": "33.5",
        "Expect": "0.009",
        "Method": "Compositional matrix adjust.",
        "Identities": "17/20",
        "Positives": "19/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "M+S+AQFLGLLLLCFQ TRC",
                "subjectStart": 1,
                "subjectString": "MVSAAQFLGLLLLCFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "979010",
        "Score": "33.9",
        "Expect": "0.010",
        "Method": "Composition-based stats.",
        "Identities": "17/20",
        "Positives": "17/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "M  SAQFLGLLLLCFQ TRC",
                "subjectStart": 4,
                "subjectString": "MRFSAQFLGLLLLCFQGTRC",
                "subjectEnd": 23
            }
        ],
        "fastaHeader": "916112",
        "Score": "33.5",
        "Expect": "0.014",
        "Method": "Composition-based stats.",
        "Identities": "17/20",
        "Positives": "17/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "M  SAQFLGLLLLCFQ TRC",
                "subjectStart": 4,
                "subjectString": "MRFSAQFLGLLLLCFQGTRC",
                "subjectEnd": 23
            }
        ],
        "fastaHeader": "978807",
        "Score": "32.3",
        "Expect": "0.026",
        "Method": "Compositional matrix adjust.",
        "Identities": "17/19",
        "Positives": "17/19",
        "Gaps": "1/19"
    },
    {
        "hits": [
            {
                "queryStart": 2,
                "queryString": "MSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MSSAQFLGLLLLCFQ  RC",
                "subjectStart": 1,
                "subjectString": "MSSAQFLGLLLLCFQGARC",
                "subjectEnd": 19
            }
        ],
        "fastaHeader": "978804",
        "Score": "32.3",
        "Expect": "0.031",
        "Method": "Compositional matrix adjust.",
        "Identities": "17/19",
        "Positives": "17/19",
        "Gaps": "1/19"
    },
    {
        "hits": [
            {
                "queryStart": 2,
                "queryString": "MSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MSSAQFLGLLLLCFQ  RC",
                "subjectStart": 1,
                "subjectString": "MSSAQFLGLLLLCFQGXRC",
                "subjectEnd": 19
            }
        ],
        "fastaHeader": "978809",
        "Score": "32.0",
        "Expect": "0.037",
        "Method": "Compositional matrix adjust.",
        "Identities": "17/19",
        "Positives": "17/19",
        "Gaps": "1/19"
    },
    {
        "hits": [
            {
                "queryStart": 2,
                "queryString": "MSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "MSSAQFLGLLLLCFQ  RC",
                "subjectStart": 1,
                "subjectString": "MSSAQFLGLLLLCFQGIRC",
                "subjectEnd": 19
            }
        ],
        "fastaHeader": "909071",
        "Score": "30.0",
        "Expect": "0.050",
        "Method": "Compositional matrix adjust.",
        "Identities": "14/16",
        "Positives": "16/16",
        "Gaps": "0/16"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ",
                "queryEnd": 16,
                "matched": "M++SAQFLGLLLLCFQ",
                "subjectStart": 1,
                "subjectString": "MIASAQFLGLLLLCFQ",
                "subjectEnd": 16
            }
        ],
        "fastaHeader": "110517",
        "Score": "31.6",
        "Expect": "0.051",
        "Method": "Compositional matrix adjust.",
        "Identities": "15/20",
        "Positives": "18/20",
        "Gaps": "1/20"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQ-TRC",
                "queryEnd": 19,
                "matched": "M+S+ QFLGLLL+CFQ TRC",
                "subjectStart": 1,
                "subjectString": "MVSTPQFLGLLLICFQGTRC",
                "subjectEnd": 20
            }
        ],
        "fastaHeader": "908865",
        "Score": "28.5",
        "Expect": "0.18",
        "Method": "Compositional matrix adjust.",
        "Identities": "13/19",
        "Positives": "15/19",
        "Gaps": "0/19"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQTRC",
                "queryEnd": 19,
                "matched": "M +SAQFLG+LLL F  RC",
                "subjectStart": 3,
                "subjectString": "MWTSAQFLGILLLWFLARC",
                "subjectEnd": 21
            }
        ],
        "fastaHeader": "908868",
        "Score": "28.1",
        "Expect": "0.33",
        "Method": "Compositional matrix adjust.",
        "Identities": "12/19",
        "Positives": "13/19",
        "Gaps": "0/19"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQTRC",
                "queryEnd": 19,
                "matched": "M + A FLGLLL CF  RC",
                "subjectStart": 1,
                "subjectString": "MRTPAPFLGLLLFCFSARC",
                "subjectEnd": 19
            }
        ],
        "fastaHeader": "908905",
        "Score": "27.7",
        "Expect": "0.37",
        "Method": "Compositional matrix adjust.",
        "Identities": "12/19",
        "Positives": "14/19",
        "Gaps": "0/19"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQTRC",
                "queryEnd": 19,
                "matched": "M + AQFLG+LLL F  RC",
                "subjectStart": 3,
                "subjectString": "MRAPAQFLGILLLWFPARC",
                "subjectEnd": 21
            }
        ],
        "fastaHeader": "908931",
        "Score": "26.9",
        "Expect": "0.77",
        "Method": "Compositional matrix adjust.",
        "Identities": "12/19",
        "Positives": "14/19",
        "Gaps": "0/19"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQTRC",
                "queryEnd": 19,
                "matched": "M +SAQF G+LLL F  RC",
                "subjectStart": 3,
                "subjectString": "MRASAQFHGILLLWFPARC",
                "subjectEnd": 21
            }
        ],
        "fastaHeader": "908900",
        "Score": "26.6",
        "Expect": "1.00",
        "Method": "Compositional matrix adjust.",
        "Identities": "11/17",
        "Positives": "13/17",
        "Gaps": "0/17"
    },
    {
        "hits": [
            {
                "queryStart": 3,
                "queryString": "SSAQFLGLLLLCFQTRC",
                "queryEnd": 19,
                "matched": "+ AQFLG+LLL F  RC",
                "subjectStart": 5,
                "subjectString": "APAQFLGILLLWFPARC",
                "subjectEnd": 21
            }
        ],
        "fastaHeader": "908911",
        "Score": "26.6",
        "Expect": "1.1",
        "Method": "Compositional matrix adjust.",
        "Identities": "12/19",
        "Positives": "13/19",
        "Gaps": "0/19"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQTRC",
                "queryEnd": 19,
                "matched": "M + AQ  G LLL FQTRC",
                "subjectStart": 3,
                "subjectString": "MRAPAQIFGFLLLLFQTRC",
                "subjectEnd": 21
            }
        ],
        "fastaHeader": "908908",
        "Score": "26.6",
        "Expect": "1.3",
        "Method": "Compositional matrix adjust.",
        "Identities": "11/19",
        "Positives": "14/19",
        "Gaps": "0/19"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQTRC",
                "queryEnd": 19,
                "matched": "M + AQFLG+LLL F  +C",
                "subjectStart": 3,
                "subjectString": "MRTPAQFLGILLLWFPIKC",
                "subjectEnd": 21
            }
        ],
        "fastaHeader": "908906",
        "Score": "26.2",
        "Expect": "1.4",
        "Method": "Compositional matrix adjust.",
        "Identities": "11/19",
        "Positives": "13/19",
        "Gaps": "0/19"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCFQTRC",
                "queryEnd": 19,
                "matched": "M + AQF G+LLL F  RC",
                "subjectStart": 3,
                "subjectString": "MRAPAQFFGILLLWFPIRC",
                "subjectEnd": 21
            }
        ],
        "fastaHeader": "85476",
        "Score": "26.6",
        "Expect": "4.3",
        "Method": "Composition-based stats.",
        "Identities": "11/15",
        "Positives": "14/15",
        "Gaps": "0/15"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCF",
                "queryEnd": 15,
                "matched": "M+S+AQFLG+LLL F",
                "subjectStart": 1,
                "subjectString": "MVSTAQFLGILLLWF",
                "subjectEnd": 15
            }
        ],
        "fastaHeader": "908890",
        "Score": "24.6",
        "Expect": "6.2",
        "Method": "Compositional matrix adjust.",
        "Identities": "11/15",
        "Positives": "13/15",
        "Gaps": "0/15"
    },
    {
        "hits": [
            {
                "queryStart": 1,
                "queryString": "MMSSAQFLGLLLLCF",
                "queryEnd": 15,
                "matched": "M +SAQFLG+LLL F",
                "subjectStart": 3,
                "subjectString": "MWTSAQFLGILLLWF",
                "subjectEnd": 17
            }
        ],
        "fastaHeader": "1341462",
        "Score": "25.4",
        "Expect": "9.3",
        "Method": "Compositional matrix adjust.",
        "Identities": "13/20",
        "Positives": "15/20",
        "Gaps": "1/20"
    }
];

console.log(list.length);
const result = filterResults.bySimilarity(list,0.7);
console.log(result.length);
