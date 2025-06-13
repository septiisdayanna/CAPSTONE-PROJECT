import DiabetesCheckPresenter from './check-diabetes-presenter';

class DiabetesCheckPage {
  async render() {
    return `
      <section class="diabetes-check container">
        <h2 class="text-2xl font-bold mb-4">Cek Risiko Diabetes</h2>
        <form id="diabetes-form" class="grid gap-4">
          ${this._generateSelectField('HighBP', 'Apakah Anda memiliki tekanan darah tinggi?')}
          ${this._generateSelectField('HighChol', 'Apakah Anda memiliki kolesterol tinggi?')}
          ${this._generateSelectField('CholCheck', 'Apakah Anda rutin memeriksa kadar kolesterol?')}
          ${this._generateSelectField('Smoker', 'Apakah Anda merokok?')}
          ${this._generateSelectField('Stroke', 'Apakah Anda pernah mengalami stroke?')}
          ${this._generateSelectField('HeartDiseaseorAttack', 'Apakah Anda pernah mengalami serangan jantung?')}
          ${this._generateSelectField('PhysActivity', 'Apakah Anda aktif secara fisik?')}
          ${this._generateSelectField('Fruits', 'Apakah Anda rutin mengonsumsi buah?')}
          ${this._generateSelectField('Veggies', 'Apakah Anda rutin mengonsumsi sayur?')}
          ${this._generateSelectField('HvyAlcoholConsump', 'Apakah Anda mengonsumsi alkohol secara berlebihan?')}

          <div>
            <label>Kesehatan Umum (1 = sangat baik, 5 = sangat buruk):
              <input type="number" name="GenHlth" min="1" max="5" required class="input" />
            </label>
          </div>

          <div>
            <label>Jumlah hari tidak sehat mental dalam sebulan (0-30):
              <input type="number" name="MentHlth" min="0" max="30" required class="input" />
            </label>
          </div>

          <div>
            <label>Jumlah hari tidak sehat fisik dalam sebulan (0-30):
              <input type="number" name="PhysHlth" min="0" max="30" required class="input" />
            </label>
          </div>

          ${this._generateSelectField('DiffWalk', 'Apakah Anda kesulitan berjalan atau naik tangga?')}

          <div>
            <label>Jenis Kelamin:
              <select name="Sex" required class="select">
                <option value="" disabled selected>Pilih</option>
                <option value="1">Laki-laki</option>
                <option value="0">Perempuan</option>
              </select>
            </label>
          </div>

          <div>
            <label>Usia:
              <input type="number" name="Age" required min="1" class="input" />
            </label>
          </div>

          <div>
            <label>BMI (Body Mass Index):
              <input type="number" name="BMI_clapped" step="0.1" required class="input" />
            </label>
          </div>

          <button type="submit" class="btn btn-primary">Prediksi Risiko</button>
        </form>
        <div id="diabetes-result" class="mt-4"></div>
      </section>
    `;
  }

  async afterRender() {
    DiabetesCheckPresenter.init({
      form: document.querySelector('#diabetes-form'),
      resultContainer: document.querySelector('#diabetes-result'),
    });
  }

  _generateSelectField(name, question) {
    return `
      <div class="field-row">
        <p class="question">${question}</p>
        <label><input type="radio" name="${name}" value="1" required /> Ya</label>
        <label><input type="radio" name="${name}" value="0" required /> Tidak</label>
      </div>
    `;
  }
}

export default DiabetesCheckPage;
