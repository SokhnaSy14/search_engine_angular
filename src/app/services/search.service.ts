import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { profilArray } from './profils.service';
import { SERVEL_URL, config } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { handleError } from './profils.service';

export interface weight {
  skill: any;
  exp: any;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  private search_result = new BehaviorSubject({});
  result = this.search_result.asObservable();

  private default_weight = new BehaviorSubject({ skill: 30, exp: 70 });
  d_weight = this.default_weight.asObservable();

  setResult(value: any): void {
    this.search_result.next(value);
  }

  /**
   * Store the weight that user has defined. By default weights are 30%-70%
   * @param value weight object
   */
  setDefaultWeight(value: any): void {
    this.default_weight.next(value);
    localStorage.setItem('weight', JSON.stringify(value));
  }

  /**
   * Return the default weights if user has not defined yet otherwise return user stored weights
   */
  getDefaultWeight(): weight {
    if (localStorage.getItem('weight')) {
      let value: any = JSON.parse(localStorage.getItem('weight'));
      return { skill: value.skill, exp: value.exp };
    }

    let skill_weight = 0;
    let exp_weight = 0;

    this.d_weight.subscribe((data: any) => {
      skill_weight = data.skill;
      exp_weight = data.exp;
    });
    return { skill: skill_weight, exp: exp_weight };
  }

  postData(url, query, config): Observable<any> {
    return this.http
      .post(url, query, config)
      .pipe(catchError(handleError('search', [])));
  }
  /**
   * Function used for searching profil. First if query text is a predefined profil (created by user) we'll search it in profilArray
   * and send it to the ranking server. Otherwise (free text) the query will be sent directly to the ranking server.
   * @param text : String | user query (predefined or not)
   */
  search(text: string): Observable<any> {
    let res = profilArray.filter((p) => p.label === text);
    let weight = this.getDefaultWeight();
    if (res.length == 0) {
      return this.postData(
        `${SERVEL_URL}search/rank`,
        {
          querySearch: text,
          ...weight,
        },
        config
      );
    } else {
      let profil = res[0];

      let request = {
        skills: {
          required: profil.required,
          optional: profil.optional,
        },
        ...weight,
      };
      return this.postData(`${SERVEL_URL}search/rank`, request, config);
    }
  }

  /**
   * Allow user to download selected CV
   * @param docs :Array[string]
   */
  download(docs: any): void {
    this.postData(`${SERVEL_URL}file `, { docs: docs }, config).subscribe(
      (data) => {
        this.http
          .get(`${SERVEL_URL}file `, { responseType: 'blob' })
          .subscribe((data) => {
            const url = window.URL.createObjectURL(data);
            window.open(url);
            window.URL.revokeObjectURL(url);
          });
      }
    );
  }

  /**
   * Ranking fonction used for sorting data according to slider values
   * @param data Object containing data to sort in shape (final_score,skills_note,exp_score)
   * @param weight Object containing slider values that will be used to sort CV
   */
  rank(data: any, weight: weight): Object {
    const { total_items, skills_note, exp_score } = data;
    //We get each key of the CV's array (keys are at index 0)
    let keys = Object.entries(skills_note).map((obj) => obj[0]);

    // we'll contain the new score calculated bellow
    let new_final_score = [];

    // Parse skill and exp weight and round it to 2 decimal after
    let skill_weight = parseFloat((weight.skill / 100).toFixed(2));
    let exp_weight = parseFloat((weight.exp / 100).toFixed(2));

    //foreach cv we recalculate the score by using the given formula:
    // 1/1 + e(-(a*skill+b*exp))
    // a = skill_weight, b = exp_weight
    // then we multiply it by 100 for having it in percent
    keys.map((k) => {
      const skill = parseFloat(
        (skill_weight * skills_note[k]['total']).toFixed(2)
      );
      const exp = parseFloat((exp_weight * exp_score[k]['total']).toFixed(2));
      const score = Math.round((1 / (1 + Math.exp(-(skill + exp)))) * 100);

      new_final_score.push({ name: k, score: score });
    });
    // we sort it according to their score
    new_final_score.sort(function (a, b) {
      return b.score - a.score;
    });

    return {
      total_items: total_items,
      final_score: new_final_score,
      skills_note: skills_note,
      exp_score: exp_score,
    };
  }
}
