
import { Button } from 'primereact/button';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Field, withTypes } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import FinalInputText from '../../_commons/FinalForm/InputText';
import onBoardImage from '../../Assets/mar-logo.jpg';
import './Login.scss';
import AuthRequestDto from '../../Services/Auth/dto/AuthRequestDto';

interface Props {
}

const Login: FunctionComponent<Props> = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { Form } = withTypes<AuthRequestDto>();
  const formRef = useRef();

  useEffect(() => {
    if (!isLoading && localStorage.getItem("token") !== null) {
      navigate("/home");
    }
  }, [isLoading, navigate]);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("token", "token");
      setIsLoading(false);
    }, 2000);
  }

  return (
    <div className='login'>
      <div className='login-left'>
        <div>
          <div className="flex justify-content-center">
            <Form
              form={formRef.current}
              onSubmit={() => { }}
              render={({ ...formProps }) =>
                <form className='login-form formgrid grid w-full lg:w-10'>
                  <div className="field col-12 container-login-text h-4rem">
                    <h2>Seja bem-vindo(a)</h2>
                    <p>Por favor, entre com seus dados de acesso a plataforma:</p>
                  </div>
                  <div className="field col-12">
                    <Field
                      name="user"
                      label="Usuário"
                      component={FinalInputText}
                      className="inputfield w-full"
                      autoFocus
                    />
                  </div>
                  <div className="field col-12">
                    <Field
                      name="password"
                      label="Senha"
                      component={FinalInputText}
                      className="inputfield w-full"
                      type="password"
                    />
                  </div>
                  {/* <div className="flex field col-12 login-options">
          <div>
            <Checkbox className="checkbox-login" onChange={() => setRememberData(state => !state)} checked={rememberData} />
            <p>Relembrar dados</p>
          </div>

          <a href='#'>Esqueceu a senha?</a>
        </div> */}
                  <div className="flex field col-12 container-login-button mt-2">
                    <Button
                      label="Entrar"
                      className="p-button-primary flex-grow-1"
                      loading={isLoading}
                      disabled={!formProps.values.user || !formProps.values.password}
                      onClick={handleSubmit}
                    />
                  </div>
                </form>
              }
            />
          </div>
        </div>
      </div>
      <div className='login-right'>
        <img alt='logo' src={onBoardImage} />
      </div>
    </div>
  );
};

export default Login;