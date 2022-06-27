
import { Button } from 'primereact/button';
import { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';
import { Field, withTypes } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import FinalInputText from '../../_commons/FinalForm/InputText';
import onBoardImage from '../../assets/mar-logo.jpg';
import './Login.scss';
import AuthRequestDto from '../../Services/Auth/dto/AuthRequestDto';
import AuthHelper from '../../helper/AuthHelper';
import { ThemeContext, toastError, toastSuccess } from '../../Misc/utils';
import Registration from './Registration/Registration';
import UserModelDto from '../../Services/User/dto/UserModelDto';
import UserService from '../../Services/User/UserService';
import GuideService from '../../Services/Guide/GuideService';
import PostGuideDto from '../../Services/Guide/dto/PostGuideDto';

interface Props {
}

const Login: FunctionComponent<Props> = (props) => {

  const [openDetail, setOpenDetail] = useState(false);
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userService = new UserService(localStorage.getItem('token'));
  const toast = useContext(ThemeContext).toast;
  const navigate = useNavigate();

  const { Form } = withTypes<AuthRequestDto>();
  const formRef = useRef();

  useEffect(() => {
    if (!isLoading && localStorage.getItem("token") !== null) {
      navigate("/home");
    }
  }, [isLoading, navigate]);

  const handleSubmit = async (formValues: UserModelDto) => {
    setIsLoading(true);
    try {
      await AuthHelper.authenticate(formValues.email, formValues.password);
    }
    catch (err: any) {
      toast?.current.show(toastError(err));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleRegister = async (formValues: UserModelDto) => {
    setIsLoadingRegister(true);
    try {
      const payload = Object.assign({}, { ...formValues, isAdmin: false, isActive: true });
      const res = await userService.createUser(payload);
      if (!res.access_token) {
        throw new Error("Erro no cadastro do Guia");
      }

      const guideService = new GuideService(res.access_token.toString());
      await guideService.createGuide({ ...formValues, isAdmin: false, isActive: true } as PostGuideDto);

      setOpenDetail(false);
      toast?.current?.show(toastSuccess('Usuário adicionado com sucesso'));
    }
    catch (err) {
      toast?.current?.show(toastError(err));
    }
    finally {
      setIsLoadingRegister(false);
    }
  }

  const handleOpenDetail = (e: any) => {
    e.preventDefault();
    setOpenDetail(true);
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
                      name="email"
                      label="Email"
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
                  <div className="flex field col-12 container-login-button mt-2">
                    <Button
                      label="Entrar"
                      className="p-button-primary  flex-grow-1"
                      loading={isLoading}
                      disabled={!formProps.values.email || !formProps.values.password}
                      onClick={() => handleSubmit(formProps.values as PostGuideDto)}
                    />
                  </div>
                  <div className="flex field col-12 container-register-button mt-2">
                    <Button
                      label="Cadastrar"
                      className="p-button-secondary flex-grow-1"
                      loading={isLoading}
                      onClick={handleOpenDetail}
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
      <Registration
        openDetail={openDetail}
        onCreate={handleRegister}
        loading={isLoadingRegister}
        onClose={() => setOpenDetail(false)}
      />
    </div>
  );
};

export default Login;