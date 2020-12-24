import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from './user.entity';

interface KeycloakUserInfoResponse {
    id: number;
    username:string;
    enabled: boolean;
    emailVerified: boolean;
    firstName: string;
    lastName: string;
    email: string;
}

@Injectable()
export class UserService {
    private accessToken: string;

    constructor(private readonly configService: ConfigService,
                private readonly httpService: HttpService) {}

    public updateAccessToken(newAccessToken: string) {
        this.accessToken = newAccessToken;
    }

    public async getUsers(): Promise<UserEntity[]> {
        const url = `${this.configService.get<string>('KEYCLOAK_HOST')}/auth/admin/realms/${this.configService.get<string>('KEYCLOAK_REALM')}/users`;

        try {
            const response = await this.httpService.get<KeycloakUserInfoResponse[]>(url, {
                headers: {
                    authorization: `Bearer ${this.accessToken}`,
                },
            }).toPromise();

            const result: UserEntity[] = [];

            for(let responseEntity of response.data) {
                result.push({
                    id: responseEntity.id,
                    email: responseEntity.email,
                    firstname: responseEntity.firstName,
                    lastname: responseEntity.lastName,
                    username: responseEntity.username
                });
            }

            return result;
        } catch (e) {
            console.log("Error during user retrieve");
            //throw new AuthenticationError(e.message);
        }
    }
}
